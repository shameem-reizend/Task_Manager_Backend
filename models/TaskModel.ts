import mongoose, { Document, Schema } from "mongoose";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { User } from "./UserModel";

@Entity('task')
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string

    @ManyToOne(() => User, (user: { tasks: any; }) => user.tasks, { nullable: false })
    assignedTo!: User;

    @ManyToOne(() => User)
    createdBy!: User;
}

// interface ITask extends Document {
//     title: String;
//     description: String;
//     assignedTo: String;
//     createdBy: String
// }

// const taskSchema = new Schema<ITask>({
//     title:{
//         type: String,
//         required: true
//     },
//     description:{
//         type: String,
//         required: true
//     },
//     assignedTo:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createdBy:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
// });

// const Task = mongoose.model('Task', taskSchema);

// export default Task;