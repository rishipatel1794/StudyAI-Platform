import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
    console.log(
        "Cloudinary config:",
        process.env.CLOUDINARY_CLOUD_NAME,
        process.env.CLOUDINARY_API_KEY,
        process.env.CLOUDINARY_API_SECRET
    );
    console.log(filePath);
    try {
        if (!filePath) return null;
        // Upload the file to Cloudinary

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });

        // file has been uploaded, now we can remove it from the server
        console.log(
            "File uploaded to Cloudinary, now removing from server: ",
            response.url
        );
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log(error);
        return null;
    }
};

export { uploadOnCloudinary };
