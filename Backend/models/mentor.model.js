const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Mentor model
 *
 * Fields:
 * - mentor_id: reference to User (one-to-one)
 * - specialization: array of strings (e.g., "Physics", "Maths")
 * - experience: number (years)
 * - credentials: flexible JSON (degrees, certificates, etc.)
 * - students_assigned: array of Student references
 * - exams_created: array of Exam references
 * - community_answers: array of PostAnswer references
 */
const MentorSchema = new Schema(
    {
        mentor_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },
        specialization: {
            type: [String],
            default: [],
            trim: true,
        },
        experience: {
            type: Number,
            min: 0,
            default: 0,
        },
        credentials: {
            // flexible JSON structure for degrees, certificates, etc.
            type: Schema.Types.Mixed,
            default: {},
        },
        students_assigned: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        exams_created: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Exam',
            },
        ],
        community_answers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PostAnswer',
            },
        ],
    },
    {
        timestamps: true,
    }
);

/* Instance helpers */
MentorSchema.methods.assignStudent = function (studentId) {
    if (!this.students_assigned.includes(studentId)) {
        this.students_assigned.push(studentId);
    }
    return this.save();
};

MentorSchema.methods.removeStudent = function (studentId) {
    this.students_assigned = this.students_assigned.filter(
        (id) => id.toString() !== studentId.toString()
    );
    return this.save();
};

MentorSchema.methods.addExam = function (examId) {
    if (!this.exams_created.includes(examId)) {
        this.exams_created.push(examId);
    }
    return this.save();
};

MentorSchema.methods.addCommunityAnswer = function (answerId) {
    if (!this.community_answers.includes(answerId)) {
        this.community_answers.push(answerId);
    }
    return this.save();
};

module.exports = mongoose.model('Mentor', MentorSchema);