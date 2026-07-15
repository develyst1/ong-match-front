import { uploadImageApi } from "@/lib/api/api-upload";

/**
 * Upload a (client-downscaled) image data URL and return its served URL.
 * Falls back to the data URL itself if the backend is unreachable, so the
 * preview still works in offline/demo mode.
 */
export const uploadImage = async (dataUrl: string): Promise<string> => {
  try {
    return (await uploadImageApi(dataUrl)).data.data.url;
  } catch {
    return dataUrl;
  }
};
