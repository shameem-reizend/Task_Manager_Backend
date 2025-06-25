import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    title: String;
    description: String;
    assignedTo: String;
    createdBy: String
}

const taskSchema = new Schema<ITask>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;