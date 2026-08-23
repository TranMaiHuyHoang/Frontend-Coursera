import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class FieldStudyService {
    readonly api = axiosInstance;

    getListFieldStudies = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/field-studies/list', body);
        return response.data;
    };
}
export const fieldStudyService = new FieldStudyService();
