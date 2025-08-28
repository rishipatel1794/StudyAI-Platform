import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) return null;
        // Upload the file to Cloudinary

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        // file has been uploaded, now we can remove it from the server
        console.log("File uploaded to Cloudinary, now removing from server: ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
};

export { uploadOnCloudinary };