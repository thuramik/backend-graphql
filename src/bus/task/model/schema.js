// Core
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true,
    },
    customerId: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created', updatedAt: false } });

export const MongooseTaskModel = mongoose.model('Task', taskSchema);