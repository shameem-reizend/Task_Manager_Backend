import User from "../models/UserModel";

export const userService = () => {
  const create = async (data: any) => {
    try {
      const resp = await User.create({
        username: data?.username,
        password: data?.hashedPassword,
        role: data?.role,
        profile_url: data?.profile_url
        });
      return resp;
    } catch (error: any) {
      return error;
    }
  };
  const finduser = async (data: any) => {
    try {
      const resp = await User.findOne({
        username: data
        });
      return resp;
    } catch (error: any) {
      return error;
    }
  };
  const getAllProfilePics = async () => {
    try {
      const resp = await User.find({}, 'profile_url').lean();

      return resp;
    } catch (error: any) {
      return error;
    }
  };
  return {
    create,
    finduser,
    getAllProfilePics
  };
};
