import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class VideoService {
    readonly api = axiosInstance;

    getListVideos = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/videos/list', body);
        return response.data;
    };

    createVideo = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/videos/create', body);
        return response.data;
    };
}

export const videoService = new VideoService();
