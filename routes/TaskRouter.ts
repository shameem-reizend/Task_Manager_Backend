import express from 'express';
import {taskCreate, viewTasks} from '../controllers/TaskController';
import { AuthenticateToken, IsAdmin } from '../middlewares/userAuthentication';

const taskRouter = express.Router();

taskRouter.post('/create', IsAdmin, taskCreate);
taskRouter.get('/', AuthenticateToken, viewTasks);

export default taskRouter