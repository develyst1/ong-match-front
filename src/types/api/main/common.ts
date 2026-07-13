// Shared backend contract types — used by every API response shape.

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PageObject<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface PageRequest {
  page?: number;
  pageSize?: number;
  sort?: string;
}
