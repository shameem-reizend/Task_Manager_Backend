// import { promises } from "dns";
// import mongoose from "mongoose";
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from '../models/UserModel'
import { Task } from '../models/TaskModel'

// const connectDB = async (): Promise<void> => {
//     try{
//         mongoose.connect('mongodb+srv://mohammedshameem:9IEmRzVDyrZ0eT7y@samplemongo.2jek2so.mongodb.net/task_manage_db');
//         console.log("Database Connected Successfully")
//     } catch(error){
//         console.log("MongoDB Connection Error", error);
//     }
// }


const connectDB = () => {

    const AppDataSource = new DataSource({
        type:"postgres",
        host: "localhost",
        port: 5432,
        username: "myuser",
        password: "reizend123",
        database: "task_db",
        entities: [User, Task],
        synchronize: true,
        logging: false,
    })

    AppDataSource.initialize()
    .then(() => {
        console.log("DataBase has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Database initialization:", err);
    });
}

export default connectDB;