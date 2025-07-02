import {User} from "../models/UserModel";

export const userService = () => {
  const create = async (data: any) => {
    try {
        const resp = await User.create({
            username: data?.username,
            password: data?.hashedPassword,
            role: data?.role,
            profile_url: data?.profile_url
        });
        resp.save();
        return resp;
    } catch (error: any) {
        return error;
    }
  };
  const finduser = async (data: any) => {
    try {
        const resp = await User.findOne({
            where: {
                username: data,
            },
        });
        return resp;
    } catch (error: any) {
        return error;
    }
  };

  const finduserByEmail = async(email: string) => {
    try {
    const resp = await User.findOne({
      where: {
        email: email,
      }
      });
    return resp;
    } catch (error: any){
      return error;
    }
  }

  const findResetuser = async (id: number) => {
    try {
        const resp = await User.findOne({
            where: {
                id: id,
            },
        });
        return resp;
    } catch (error: any) {
        return error;
    }
  }

  const getAllProfilePics = async () => {
    try {
        const resp = await User.find({
            select: ['id', 'username', 'profile_url'],
        });

      return resp;
    } catch (error: any) {
      return error;
    }
  };
  interface ResetTokenData {
    reset_token: string;
    reset_token_expires?: Date;
  }

  const saveResetToken = async (userId: number, data: ResetTokenData) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.reset_token = data.reset_token;
      user.reset_token_expires = data.reset_token_expires;
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error(`Error saving reset token: ${error.message}`);
    }
  };

  const saveNewPassword = async (hashedPassword: string, userId: number) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.password = hashedPassword;
      user.reset_token = undefined;
      user.reset_token_expires = undefined; // Clear reset token expiration
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error(`Error saving new password: ${error.message}`);
    }
  };
  return {
    create,
    finduser,
    getAllProfilePics,
    saveResetToken,
    saveNewPassword,
    findResetuser,
    finduserByEmail
  };
};
