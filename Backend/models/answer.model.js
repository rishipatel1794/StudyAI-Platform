const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
    {
        // references to other collections (use ObjectId by default in MongoDB)
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            index: true,
        },

        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
        },

        
        is_mentor_verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Answer', AnswerSchema);
