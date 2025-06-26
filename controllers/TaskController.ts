import { Request, Response } from "express";
// import Task from "../models/TaskModel";
import { taskService } from "../service/task-service";

const { create, view } = taskService();

export const taskCreate = async (req: any, res: any) => {
  const { title, description, assignedTo } = req.body;
  const createdBy = req.userData.id;
  const data = {title, description, assignedTo, createdBy}
  try {
    // await Task.create({
    //     title: title,
    //     description: description,
    //     assignedTo: assignedTo,
    //     createdBy: createdBy,
    // });

    const resp = await create(data);
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
    const userId = req.user.id
    // console.log(id)
    const resp = await view(userId)
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
