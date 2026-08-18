export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<DataType = any> {
    statusCode: number;
    message: string;
    data: DataType;
    option_data?: {
        pagination?: PaginationMeta;
        [key: string]: unknown;
    };
}
