import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class FieldStudyService {
    readonly api = axiosInstance;

    getListFieldStudies = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/list', body);
        return response.data;
    };

    getDetailFieldStudy = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/detail', body);
        return response.data;
    };

    createdlFieldStudy = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/create', body);
        return response.data;
    };
    updateFieldStudy = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/update', body);
        return response.data;
    };

    deleteFieldStudy = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/delete', body);
        return response.data;
    };
}
export const fieldStudyService = new FieldStudyService();
