import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const mailFormat = (otp, userName = "") => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Study AI Platform - OTP</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; background:#f6f8fb; margin:0; padding:20px;">
    <table role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:24px 32px 8px 32px; text-align:left;">
          <h1 style="margin:0;color:#0b63d1;font-size:20px;">Study AI Platform</h1>
          <p style="margin:8px 0 0 0;color:#444;font-size:14px;">
            Hi ${userName || "there"},
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 32px 16px 32px;">
          <p style="margin:0 0 12px 0;color:#333;font-size:15px;">
            Use the following One-Time Password (OTP) to verify your email address. This code expires in 5 minutes.
          </p>

          <div style="margin:18px 0;padding:14px 18px;background:#f1f7ff;border-radius:6px;text-align:center;">
            <span style="display:inline-block;font-size:28px;font-weight:700;letter-spacing:6px;color:#0b63d1;">
              ${otp}
            </span>
          </div>

          <p style="margin:0;color:#666;font-size:13px;">
            If you did not request this, please ignore this email or contact support.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:12px 32px 24px 32px;border-top:1px solid #eef2f7;">
          <p style="margin:0;font-size:12px;color:#9aa4b2;">
            Study AI Platform • Learn smarter with AI
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      mailFormat(otp)
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export const OTP = mongoose.model("OTP", otpSchema);