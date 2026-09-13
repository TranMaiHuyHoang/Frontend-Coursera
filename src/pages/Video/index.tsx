import { useEffect, useState } from 'react';
import usePaginationList from '@/hooks/usePaginationList';
import useScrollToEnd from '@/hooks/useScrollToEnd';
import type { IVideoGroup } from '@/models/videoGroup';
import { videoGroupService } from '@/services/VideoGroupService';
import { Plus } from 'lucide-react';
import SearchInput from '@/components/common/SearchInput';
import VideoGroupCard from '@/components/VideoGroupCard';
import CreateVideoGroupModal from '@/components/CreateVideoGroupModal';

const VIDEO_FILTER_OPTIONS = [
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Cũ nhất', value: 'oldest' },
    { label: 'Đang hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'not_active' },
];

export default function Video() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(VIDEO_FILTER_OPTIONS[0].value);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<IVideoGroup | null>(null);

    const {
        list: videoGroups,
        setList: setVideoGroups,
        loadFirstPage,
        loadMore,
    } = usePaginationList<IVideoGroup>({
        fetchFn: async (payload) => {
            const res = await videoGroupService.getListVideoGroups(payload);
            return res.data;
        },
        limit: 10,
        params: { keyword: search, filter },
    });

    useEffect(() => {
        loadFirstPage();
    }, [search, filter]);

    const openCreateModal = () => {
        setEditingGroup(null);
        setIsModalOpen(true);
    };

    const openUpdateModal = (group: IVideoGroup) => {
        setEditingGroup(group);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGroup(null);
    };

    const handleCreateVideoGroup = (newGroup: IVideoGroup) => {
        setVideoGroups((prevGroups) => [newGroup, ...prevGroups]);
    };

    const handleUpdateVideoGroup = (updatedGroup: IVideoGroup) => {
        setVideoGroups((prevGroups) =>
            prevGroups.map((group) =>
                group._id === updatedGroup._id
                    ? { ...group, ...updatedGroup }
                    : group,
            ),
        );
    };

    const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });

    return (
        <div className="flex h-full flex-col bg-[#f8f9fa]">
            {/* Header - không cuộn */}
            <div className="shrink-0 border-b border-gray-200 bg-white">
                <div className="px-6 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[20px] font-bold text-gray-800">
                            Quản lý video
                        </h1>

                        <button
                            onClick={openCreateModal}
                            type="button"
                            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                        >
                            <Plus size={20} />
                            Thêm Nhóm Video
                        </button>
                    </div>

                    <div className="mt-5 flex justify-end gap-2">
                        <SearchInput defaultValue={search} onSearch={setSearch} />
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

            {/* List - chỉ phần này cuộn */}
            <main
                className="min-h-0 flex-1 overflow-y-auto p-5"
                ref={containerRef}
            >
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {videoGroups.map((group) => (
                        <VideoGroupCard
                            key={group._id}
                            group={group}
                            onUpdate={openUpdateModal}
                        />
                    ))}
                </div>

                {videoGroups.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy nhóm video nào
                    </div>
                )}
            </main>

            <CreateVideoGroupModal
                mode={editingGroup ? 'update' : 'create'}
                isOpen={isModalOpen}
                videoGroup={editingGroup}
                onClose={closeModal}
                onCreated={handleCreateVideoGroup}
                onUpdated={handleUpdateVideoGroup}
            />
        </div>
    );
}
