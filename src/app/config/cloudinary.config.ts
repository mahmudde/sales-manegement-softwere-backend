import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import status from "http-status";

import { envVars } from "./env";
import AppError from "../errorHelper/AppError";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

// manual buffer upload
export const uploadFileCloudinary = async (
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName) {
    throw new AppError(
      status.BAD_REQUEST,
      "File buffer and file name are required for upload",
    );
  }

  const extension = fileName.split(".").pop()?.toLowerCase();

  const filenameWithoutExtension = fileName
    .split(".")
    .slice(0, -1)
    .join(".")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  const uniqueName =
    Math.random().toString(36).substring(2) +
    "-" +
    Date.now() +
    "-" +
    filenameWithoutExtension;

  const folder = extension === "pdf" ? "pdfs" : "images";

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `sales-management-software/${folder}`,
          public_id: uniqueName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(
                status.INTERNAL_SERVER_ERROR,
                "Failed to upload file to cloudinary",
              ),
            );
          }

          if (!result) {
            return reject(
              new AppError(
                status.INTERNAL_SERVER_ERROR,
                "Failed to upload file to cloudinary",
              ),
            );
          }

          resolve(result);
        },
      )
      .end(buffer);
  });
};

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    if (!url || !url.includes("res.cloudinary.com")) {
      return;
    }

    const uploadPart = url.split("/upload/")[1];

    if (!uploadPart) {
      return;
    }

    const publicIdWithExtension = uploadPart
      .split("/")
      .slice(1)
      .join("/")
      .split("?")[0];

    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

    if (!publicId) {
      return;
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.log("Error deleting file from cloudinary", error);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to delete file from cloudinary",
    );
  }
};

export const cloudinaryUpload = cloudinary;
