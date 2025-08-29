import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { sendOTP } from "../controllers/otp.controller.js";

const router = Router();

router.route('/register').post(upload.single("avatar"),registerUser);
router.route('/otp').post(sendOTP);
// router.route('/login').post(loginUser);

export default router;