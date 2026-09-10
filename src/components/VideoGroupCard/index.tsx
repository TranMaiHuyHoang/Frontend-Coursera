import { PlayCircle } from 'lucide-react';
import moment from 'moment';
import type { IVideoGroup } from '@/models/videoGroup';

interface VideoGroupCardProps {
    group: IVideoGroup;
}

export default function VideoGroupCard({ group }: VideoGroupCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
            {/* Thumbnail */}
            <div className="relative flex h-40 items-center justify-center bg-gray-100">
                <PlayCircle size={48} className="text-purple-500" />

                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                    {group.number_video} video
                </span>
            </div>

            {/* Nội dung */}
            <div className="p-5">
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        group.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {group.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>

                <h3 className="mt-2 font-semibold text-gray-900">
                    {group.video_group_name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Ngày tạo: {moment(group.createdAt).format('DD/MM/YYYY')}
                </p>
            </div>
        </div>
    );
}
