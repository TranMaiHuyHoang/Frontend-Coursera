import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { videoGroupService } from '@/services/VideoGroupService';
import type { IVideoGroup } from '@/models/videoGroup';

interface CreateVideoGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'create' | 'update';
    videoGroup?: IVideoGroup | null;
    onCreated?: (newVideoGroup: IVideoGroup) => void;
    onUpdated?: (updatedVideoGroup: IVideoGroup) => void;
}

export default function CreateVideoGroupModal({
    isOpen,
    onClose,
    mode = 'create',
    videoGroup = null,
    onCreated,
    onUpdated,
}: CreateVideoGroupModalProps) {
    const [videoGroupName, setVideoGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const isUpdateMode = mode === 'update';

    useEffect(() => {
        if (!isOpen) return;

        if (isUpdateMode && videoGroup) {
            setVideoGroupName(videoGroup.video_group_name ?? '');
            setDescription('');
            setIsActive(videoGroup.is_active ?? true);
        } else {
            setVideoGroupName('');
            setDescription('');
            setIsActive(true);
        }
    }, [isOpen, isUpdateMode, videoGroup]);

    if (!isOpen) return null;

    const resetForm = () => {
        setVideoGroupName('');
        setDescription('');
        setIsActive(true);
    };

    const handleClose = () => {
        if (isLoading) return;

        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            if (isUpdateMode) {
                const res = await videoGroupService.updateVideoGroup({
                    video_group_id: videoGroup?._id,
                    video_group_name: videoGroupName.trim(),
                    is_active: isActive,
                });

                toast.success('Cập nhật nhóm video thành công!');

                resetForm();
                onClose();
                onUpdated?.(res.data);
            } else {
                const res = await videoGroupService.createVideoGroup({
                    video_group_name: videoGroupName.trim(),
                    description: description.trim(),
                    is_active: isActive,
                });

                toast.success('Thêm nhóm video thành công!');

                resetForm();
                onClose();
                onCreated?.(res.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                isUpdateMode
                    ? 'Có lỗi xảy ra khi cập nhật nhóm video!'
                    : 'Có lỗi xảy ra khi thêm nhóm video!',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        {isUpdateMode ? 'Cập Nhật Nhóm Video' : 'Thêm Nhóm Video'}
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-5">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Tên Nhóm Video
                        </label>

                        <input
                            type="text"
                            value={videoGroupName}
                            onChange={(e) => setVideoGroupName(e.target.value)}
                            className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                            placeholder="Nhập tên nhóm video..."
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {!isUpdateMode && (
                        <div className="mb-5">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Mô tả
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                                placeholder="Mô tả chi tiết nhóm video..."
                                rows={4}
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <div className="mb-8 flex items-center gap-2">
                        <input
                            id="video-group-active-checkbox"
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            disabled={isLoading}
                            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-cyan-500 disabled:opacity-50"
                        />

                        <label
                            htmlFor="video-group-active-checkbox"
                            className="cursor-pointer text-sm font-medium text-gray-700"
                        >
                            Đang hoạt động
                        </label>
                    </div>

                    {/* Actions */}
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
                            {isUpdateMode
                                ? isLoading
                                    ? 'Đang cập nhật...'
                                    : 'Cập Nhật'
                                : isLoading
                                  ? 'Đang tạo...'
                                  : 'Tạo nhóm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
