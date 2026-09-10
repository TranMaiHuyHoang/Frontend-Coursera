export interface IVideo {
    _id: string;
    videoGroupId: string;
    video_name: string;
    description: string;
    list_field_study: string[];
    list_language: string[];
    video_url: string;
    avtart_image: string;
    duration: number;
    is_active: boolean;
    approved_or_not: boolean | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IVideoGroup {
    _id: string;
    video_group_name: string;
    list_video: IVideo[];
    number_video: number;
    is_active?: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
