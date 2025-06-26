import 'reflect-metadata';
import express , { Request, Response } from 'express';
import connectDB from './config/database';
import userRouter from './routes/UserRouter'
import taskRouter from './routes/TaskRouter';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/user',userRouter);
app.use('/task',taskRouter);


app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
})