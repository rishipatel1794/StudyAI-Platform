const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number, // minutes
        required: true,
        min: 1
    },
    scheduled_at: {
        type: Date
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, {
    timestamps: true,
    collection: 'exams'
});

module.exports = mongoose.model('Exam', ExamSchema);