import otpGenerator from "otp-generator";
import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if user is already present
        const user = await User.findOne({ email });
        // If user found with provided email
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        if (!otpBody) {
            throw new ApiError(500, "Unable to send OTP");
        }
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        console.log(email, otp);

        // Use findOneAndDelete to make verification atomic and prevent OTP reuse (and slightly faster than separate find + delete)

        const otpDoc = await OTP.findOneAndDelete({ email, otp }).lean();

        const user = await User.findOne({ email });
        if (!otpDoc) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or expired OTP" });
        }

        if (
            user &&
            (user.isVerified === undefined || user.isVerified === null)
        ) {
            user.isVerified = false;
        }
        if (user) {
            if (!user.isVerified) {
                user.isVerified = true;
                await user.save();
            }
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: otpDoc,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export { sendOTP, verifyOtp };
