import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { videoService } from '@/services/VideoService';
import type { IVideo } from '@/models/videoGroup';

interface CreateVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoGroupId: string;
    onCreated?: (newVideo: IVideo) => void;
}

export default function CreateVideoModal({
    isOpen,
    onClose,
    videoGroupId,
    onCreated,
}: CreateVideoModalProps) {
    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [avtartImage, setAvtartImage] = useState('');
    const [duration, setDuration] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setVideoName('');
        setDescription('');
        setVideoUrl('');
        setAvtartImage('');
        setDuration(0);
        setIsActive(true);
    };

    useEffect(() => {
        if (!isOpen) return;
        resetForm();
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        if (isLoading) return;
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!videoName.trim() || !videoUrl.trim()) {
            toast.warning('Vui lòng nhập tên video và URL video');
            return;
        }

        try {
            setIsLoading(true);

            const res = await videoService.createVideo({
                video_group_id: videoGroupId,
                video_name: videoName.trim(),
                description: description.trim(),
                video_url: videoUrl.trim(),
                avtart_image: avtartImage.trim(),
                duration: Number(duration) || 0,
                is_active: isActive,
                approved_or_not: null,
            });

            if (res.statusCode === 200) {
                toast.success('Thêm video thành công!');
                resetForm();
                onClose();
                onCreated?.(res.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi thêm video!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Thêm Video
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-2xl leading-none text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6">
                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Tên Video
                        </label>
                        <input
                            type="text"
                            value={videoName}
                            onChange={(e) => setVideoName(e.target.value)}
                            className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            placeholder="Nhập tên video..."
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            placeholder="Mô tả chi tiết video..."
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            URL Video
                        </label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            placeholder="https://example.com/video.mp4"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            URL Ảnh thumbnail
                        </label>
                        <input
                            type="url"
                            value={avtartImage}
                            onChange={(e) => setAvtartImage(e.target.value)}
                            className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            placeholder="https://example.com/thumb.png"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Thời lượng (giây)
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-8 flex items-center gap-2">
                        <input
                            id="video-active-checkbox"
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            disabled={isLoading}
                            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-cyan-500 disabled:opacity-50"
                        />
                        <label
                            htmlFor="video-active-checkbox"
                            className="cursor-pointer text-sm font-medium text-gray-700"
                        >
                            Đang hoạt động
                        </label>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-50"
                        >
                            {isLoading ? 'Đang tạo...' : 'Tạo video'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
