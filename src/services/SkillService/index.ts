import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class SkillService {
    readonly api = axiosInstance;

    getListSkills = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/list', body);
        return response.data;
    };

    getDetailSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/detail', body);
        return response.data;
    };

    createSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/create', body);
        return response.data;
    };

    updateSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/update', body);
        return response.data;
    };

    deleteSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/delete', body);
        return response.data;
    };
}
export const skillService = new SkillService();
