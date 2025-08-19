import mogoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mogoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password_hash: { type: String, required: true },
        role: {
            type: String,
            enum: ["student", "mentor", "admin"],
            default: "student",
        },
        profile_pic: { type: String, default: null },
    },
    { timestamps: true }
);

// instance method to compare a plain password with the stored hash
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password_hash);
};

// instance method to generate a JWT (requires JWT_SECRET in env)
userSchema.methods.generateAuthToken = function () {
    const payload = { id: this._id, role: this.role, email: this.email };
    return jwt.sign(payload, process.env.JWT_SECRET || "change_this_secret", {
        expiresIn: "7d",
    });
};

export const User = mogoose.model("User", userSchema);
