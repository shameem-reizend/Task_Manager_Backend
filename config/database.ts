import { promises } from "dns";
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try{
        mongoose.connect('mongodb+srv://mohammedshameem:9IEmRzVDyrZ0eT7y@samplemongo.2jek2so.mongodb.net/task_manage_db');
        console.log("Database Connected Successfully")
    } catch(error){
        console.log("MongoDB Connection Error", error);
    }
}

export default connectDB;