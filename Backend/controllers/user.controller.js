import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Student } from "../models/student.model.js";
import { Mentor } from "../models/mentor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Get User details from frontend
    // Validation - Not Empty
    // Check if user already exists
    // Check for image
    // upload image to cloudinary
    // Create user object - create entry  in DB
    // Remove password and refresh token from response
    // Check for user creation
    // return response
    const { name, email, password, role } = req.body;
    // console.log(name, email, password, role);
    if ([name, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (mongoose.connection.readyState !== 1) {
        throw new ApiError(503, "Database not connected");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    

    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath)
    let avatar = { url: null };

    if (avatarLocalPath) {
        const uploaded = await uploadOnCloudinary(avatarLocalPath);
        console.log(uploaded);
        if (uploaded && uploaded.url) {
            avatar = uploaded;
        } else {
            console.warn("Avatar upload failed or returned no URL; continuing without avatar");
        }
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: avatar?.url,
    });

    if (role === "student") {
        const student = await Student.create({ student_id: user._id });
    }
    if (role === "mentor") {
        const mentor = await Mentor.create({ mentor_id: user._id });
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refresh_token"
    );

    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
