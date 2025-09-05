import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Student } from "../models/student.model.js";
import { Mentor } from "../models/mentor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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
    console.log(avatarLocalPath);
    let avatar = { url: null };

    if (avatarLocalPath) {
        const uploaded = await uploadOnCloudinary(avatarLocalPath);
        console.log(uploaded);
        if (uploaded && uploaded.url) {
            avatar = uploaded;
        } else {
            console.warn(
                "Avatar upload failed or returned no URL; continuing without avatar"
            );
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

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();

        // Use existing refresh token if present, otherwise generate and persist a new one
        let refreshToken = user.refresh_token;
        if (!refreshToken) {
            refreshToken = user.generateRefreshToken();
            user.refresh_token = refreshToken;
            await user.save({ validateBeforeSave: false });
        }

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email or password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isVerified) {
        throw new ApiError(401, "Please verify your email before logging in");
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refresh_token"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
        userId,
        { $set: { refresh_token: undefined } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "unauthorized access");
    }

    try {
        const decode = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decode?._id)
    
        if(!user){
            throw new ApiError(401, "unauthorized access - user not found");
        }
    
        if(user?.refresh_token !== incomingRefreshToken){
            throw new ApiError(401, "unauthorized access - token mismatch");
        }
    
        const options = {
            httpOnly: true,
            secure: true,
        };
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, "Error refreshing access token");
    }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
