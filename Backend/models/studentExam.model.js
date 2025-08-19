const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentExamSchema = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
            index: true,
        },
        exam_id: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
            index: true,
        },
        submitted_at: { type: Date },
        score: { type: Number, min: 0 },
        // answers: map of question_id -> chosen_answer (chosen_answer can be any JSON)
        answers: {
            type: Map,
            of: Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

// Optional: enforce one submission per student per exam
// StudentExamSchema.index({ student_id: 1, exam_id: 1 }, { unique: true });

module.exports = mongoose.model("StudentExam", StudentExamSchema);
