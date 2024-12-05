import mongoose, { model, Schema } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL || '')

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String}
})

const contentSchema = new Schema({
    title: {type: String},
    description: {type: String},
    type: {
        type: String,
        enum: ['tweets', 'videos', 'documents', 'links'],
        required: true
    },
    link: {
        type: [String],
        validate: {
          validator: function (value: string[]) {
            return value.every(link => /^https?:\/\/.+\..+/.test(link));
          },
          message: 'All links must be valid URLs'
        },
        default: []
    },
    tags: [String],
    createdAt: {
        type: Date
    },
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    
})
export const contentModel = model('Content', contentSchema)
export const userModel = model('User', userSchema)