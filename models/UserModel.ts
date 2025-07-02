import mongoose, { Document, Schema } from "mongoose";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Check } from 'typeorm';
import { Task } from "./TaskModel";

export enum roles {
    user = 'user',
    admin = 'admin'
}

@Check(`"email" ~* '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'`)
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true
  })
  email!: string;

  @Column({
    type: 'enum',
    enum: roles,
    default: roles.user
  })
  role!: string;

  @Column({ nullable: true })
  profile_url?: string;

  @OneToMany(() => Task, (task: { assignedTo: any; }) => task.assignedTo)
  tasks!: Task[];

  @Column({ type: 'text', nullable: true })
  reset_token?: string;

  @Column({ type: 'timestamp', nullable: true })
  reset_token_expires?: Date;
}



// interface IUser extends Document {
//     username: String;
//     password: String;
//     role: 'user' | 'admin';
//     profile_url: String,
// }

// const userSchema  = new Schema<IUser>({
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         required: true
//     },
//     profile_url: {
//         type: String,
//         required: true
//     }
// })

// const User = mongoose.model('User', userSchema);

// export default User;