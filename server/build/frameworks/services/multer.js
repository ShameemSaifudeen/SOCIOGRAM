"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../../config"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: config_1.default.CLOUD_NAME,
    api_key: config_1.default.API_KEY,
    api_secret: config_1.default.API_SECRET
});
// Configure multer storage using Cloudinary
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: (req, file) => 'uploads',
        resource_type: (req, file) => {
            // Determine the resource type based on the file mimetype
            if (file.mimetype.startsWith('video/')) {
                return 'video';
            }
            return 'auto';
        },
        public_id: (req, file) => {
            const fileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
            return fileName;
        }
    }
});
// Create multer instance with Cloudinary storage
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
