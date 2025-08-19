const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        target_exam: {
            type: String,
            enum: ["JEE", "NEET", "GATE", "CAT", "GRE", "GMAT", "OTHER"],
            default: "OTHER",
        },
        academic_level: {
            type: String,
            trim: true,
        },
        study_habits: {
            // free text: preferences, daily hours, notes
            trim: true,
        },
        // mark if the student prepares by themself
        is_self_prepared: {
            type: Boolean,
            default: false,
        },
        enrolled_mentors: {
            type: [{ type: Schema.Types.ObjectId, ref: "Mentor" }],
            validate: {
                validator: function (v) {
                    // if self-prepared, mentors can be empty; otherwise require at least one
                    return (
                        this.is_self_prepared ||
                        (Array.isArray(v) && v.length > 0)
                    );
                },
                message: "At least one mentor required when not self-prepared.",
            },
        },
        enrolled_exams: {
            type: [
                {
                    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
                    // mock exams may be created by a Mentor or by an AI system
                    created_by: { type: String, enum: ["Mentor", "AI"], required: true, default: "Mentor" },
                },
            ]
        },
        progress: {
            // exam-wise scores, material completed, timestamps, etc.
            type: Schema.Types.Mixed,
            default: {},
        },
        saved_materials: [
            {
                type: Schema.Types.ObjectId,
                ref: "StudyMaterial",
            },
        ],
        community_posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

module.exports =
    mongoose.models.Student || mongoose.model("Student", StudentSchema);
