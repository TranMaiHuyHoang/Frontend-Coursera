import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class LanguageService {
    readonly api = axiosInstance;

    getListLanguage = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/languages/list', body);
        return response.data;
    };

    getDetailLanguage = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/languages/detail', body);
        return response.data;
    };

    createLanguage = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/languages/create', body);
        return response.data;
    };

    updateLanguage = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/languages/update', body);
        return response.data;
    };
    deleteLanguage = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/languages/delete', body);
        return response.data;
    };
}
export const languageService = new LanguageService();
