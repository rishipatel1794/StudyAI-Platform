import mongoose, { Schema } from "mongoose";

const studyMaterialSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["pdf", "video", "notes", "quiz"],
            required: true,
        },
        url: {
            type: String, 
            required: true,
        },
        uploaded_by: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'uploaderModel'
        },
        uploaderModel: {
            type: String,
            required: true,
            enum: ['Mentor', 'Admin']
        }
    },
    {
        timestamps: true,
    }
);

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
