import { mainClient } from "./client";
import type { ApiResponse } from "@/types/api/main/common";

export const uploadImageApi = (dataUrl: string) =>
  mainClient.post<ApiResponse<{ url: string }>>("/api/v1/uploads", { dataUrl });
