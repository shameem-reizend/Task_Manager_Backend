import Task from "../models/TaskModel";

export const taskService = () => {
  const create = async (data: any) => {
    try {
      const resp = await Task.create({
        title: data?.title,
        description: data?.description,
        assignedTo: data?.assignedTo,
        createdBy: data?.createdBy,
      });
      return resp;
    } catch (error: any) {
      return error;
    }
  };
  const view = async(id: String) => {
    try{
      const resp = await Task.find({ assignedTo: id });
      return resp;
    } catch(error: any) {
      return error;
    }
  }
  return {
    create,
    view
  };
};
