import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class VideoGroupService {
    readonly api = axiosInstance;

    getListVideoGroups = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/video-groups/list', body);
        return response.data;
    };

    createVideoGroup = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/video-groups/create', body);
        return response.data;
    };

    updateVideoGroup = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/video-groups/update', body);
        return response.data;
    };
}

export const videoGroupService = new VideoGroupService();
