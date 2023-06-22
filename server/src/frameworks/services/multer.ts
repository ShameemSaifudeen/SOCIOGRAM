import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import configKeys from '../../config'

// Configure Cloudinary
cloudinaryV2.config({ 
    cloud_name: configKeys.CLOUD_NAME, 
    api_key: configKeys.API_KEY, 
    api_secret: configKeys.API_SECRET 
  });

// Configure multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: (req: any, file: any) => 'uploads', // Specify the folder in Cloudinary where you want to store the files
    resource_type: (req: any, file: any) => {
      // Determine the resource type based on the file mimetype
      if (file.mimetype.startsWith('video/')) {
        return 'video';
      }
      return 'auto';
    },
    public_id: (req: Express.Request, file: Express.Multer.File) => {
      const fileName = `${uuidv4()}-${file.originalname}`;
      return fileName;
    }
  } as any
});

// Create multer instance with Cloudinary storage
const upload = multer({ storage });

export { upload };
