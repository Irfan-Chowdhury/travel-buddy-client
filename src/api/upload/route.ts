import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";  // IMPORTANT

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cloudinary requires a Promise wrapper
    const uploaded: any = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "travel-buddy/users",
          resource_type: "image",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );

      upload.end(buffer);
    });

    return NextResponse.json(
      { success: true, url: uploaded.secure_url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("UPLOAD API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed", error: String(error) },
      { status: 500 }
    );
  }
}




