export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
  errors?: string[];
}

export interface BaseListResponse<T> {
  status: number;
  message: string;
  data: T[];
  errors?: string[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MutationArgs<T> {
  _onSuccess?: (data: T) => void;
  _onError?: (error: Error) => void;
}
