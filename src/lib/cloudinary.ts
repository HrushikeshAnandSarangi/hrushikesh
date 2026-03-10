import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image buffer to Cloudinary
 * @param buffer The image file buffer array
 * @param folder The folder in Cloudinary to store the image
 * @returns The secure URL of the uploaded image
 */
export async function uploadImage(buffer: Buffer, folder: string = "portfolio"): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Unknown error during upload."));
        }
      }
    );

    // Write the buffer to the upload stream
    uploadStream.end(buffer);
  });
}
