import { Request, Response } from "express";
import Task from "../models/TaskModel";
import { taskService } from "../service/task-service";

const { create, view } = taskService();

export const taskCreate = async (req: Request, res: Response) => {
  const { title, description, assignedTo, createdBy } = req.body;

  try {
    // await Task.create({
    //     title: title,
    //     description: description,
    //     assignedTo: assignedTo,
    //     createdBy: createdBy,
    // });

    const resp = await create(req?.body);
    res.json({
      message: "Task Created Successful",
      data: resp,
    });
  } catch (error) {
    res.json({
      message: "Provide valid input",
      error,
    });
  }
};

export const viewTasks = async (req: any, res: Response) => {
  try {
    // const tasks = await Task.find({ assignedTo: req.user.id });
    const id = req.user.id
    const resp = await view(id)
    res.json({
      message: "Task fetched successfully",
      data: resp,
    });
  } catch (error) {
    res.json({
      message: "Login required",
    });
  }
};
