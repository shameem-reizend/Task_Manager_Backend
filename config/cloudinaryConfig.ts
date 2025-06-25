import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { FileFilterCallback } from 'multer';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

const cloudinaryConfig: ConfigOptions = {
  api_key: process.env.CLOUDINARY_API_KEY!,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: 'images-folder',
    format: 'png',
    public_id: `${file.fieldname}_${Date.now()}`,
    transformation: [
      {
        width: 800,
        height: 600,
        crop: 'fill',
      },
    ],
  }),
});


const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1020 * 5,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image. Please upload an image.'));
    }
  },
});

export default upload;
