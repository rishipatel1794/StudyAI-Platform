const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        author_id: {
            type: String,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        media_url: {
            type: String,
            default: null
        },
        tags: {
            type: [String],
            default: []
        },
        answers: [
            {
                type: String,
                ref: 'Answer'
            }
        ]
    },
    {
        timestamps: true
    }
);

// Text index for simple search on title and content
PostSchema.index({ title: 'text', content: 'text', tags: 1 });

// Hide internal fields when converting to JSON
PostSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Post', PostSchema);