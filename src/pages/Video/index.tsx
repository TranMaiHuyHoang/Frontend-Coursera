import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import usePaginationList from '@/hooks/usePaginationList';
import useScrollToEnd from '@/hooks/useScrollToEnd';
import type { IVideo } from '@/models/videoGroup';
import { videoService } from '@/services/VideoService';
import SearchInput from '@/components/common/SearchInput';
import VideoCard from '@/components/VideoCard';
import CreateVideoModal from '@/components/CreateVideoModal';

const VIDEO_FILTER_OPTIONS = [
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Cũ nhất', value: 'oldest' },
    { label: 'Đang hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'not_active' },
];

type VideoLocationState = {
    video_group_name?: string;
};

export default function Video() {
    const { videoGroupId } = useParams();
    const location = useLocation();
    const locationState = (location.state as VideoLocationState | null) ?? null;
    const videoGroupName = locationState?.video_group_name;

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(VIDEO_FILTER_OPTIONS[0].value);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        list: videos,
        setList: setVideos,
        loadFirstPage,
        loadMore,
    } = usePaginationList<IVideo>({
        fetchFn: async (payload) => {
            const res = await videoService.getListVideos({
                ...payload,
                video_group_id: videoGroupId,
            });
            return res.data;
        },
        limit: 10,
        params: { keyword: search, filter },
    });

    useEffect(() => {
        if (!videoGroupId) return;
        loadFirstPage();
    }, [search, filter, videoGroupId]);

    const handleCreateVideo = (newVideo: IVideo) => {
        setVideos((prevVideos) => [newVideo, ...prevVideos]);
    };

    const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });

    return (
        <div className="flex h-full flex-col bg-[#f8f9fa]">
            <div className="shrink-0 border-b border-gray-200 bg-white">
                <div className="px-6 py-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                        <Link
                            to="/video-group"
                            className="cursor-pointer hover:text-blue-600"
                        >
                            Quản lý video
                        </Link>
                        <span>/</span>
                        <span className="text-gray-800">
                            {videoGroupName || 'Danh sách video'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-[20px] font-bold text-gray-800">
                            {videoGroupName || 'Danh sách video'}
                        </h1>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            type="button"
                            disabled={!videoGroupId}
                            className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <Plus size={20} />
                            Thêm Video
                        </button>
                    </div>

                    <div className="mt-5 flex justify-end gap-2">
                        <SearchInput
                            defaultValue={search}
                            onSearch={setSearch}
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {VIDEO_FILTER_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <main
                className="min-h-0 flex-1 overflow-y-auto p-5"
                ref={containerRef}
            >
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>

                {videos.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy video nào
                    </div>
                )}
            </main>

            {videoGroupId ? (
                <CreateVideoModal
                    isOpen={isModalOpen}
                    videoGroupId={videoGroupId}
                    onClose={() => setIsModalOpen(false)}
                    onCreated={handleCreateVideo}
                />
            ) : null}
        </div>
    );
}
