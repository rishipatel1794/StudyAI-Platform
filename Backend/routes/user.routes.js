import { Router } from "express";
import { registerUser, loginUser,logoutUser,refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { sendOTP } from "../controllers/otp.controller.js";
import { verifyOtp } from "../controllers/otp.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/otp").post(sendOTP);
router.route("/verify-otp").post(verifyOtp);
router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
