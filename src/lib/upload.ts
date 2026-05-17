/**
 * uploadImage — Client-side utility for uploading images to Supabase Storage.
 * Converts a File object to base64, then calls the uploadAdminAsset server action.
 */
"use client";

import { uploadAdminAsset } from "@/lib/admin-actions";

export async function uploadImage(
  file: File,
  folder: string = "assets"
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const { publicUrl } = await uploadAdminAsset({
    bucket: "portfolio",
    folder,
    filename: file.name,
    contentType: file.type,
    bytesBase64: base64,
  });

  return publicUrl;
}
