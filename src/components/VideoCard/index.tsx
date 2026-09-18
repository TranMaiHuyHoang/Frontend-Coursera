import moment from 'moment';
import { PlayCircle } from 'lucide-react';
import type { IVideo } from '@/models/videoGroup';

interface VideoCardProps {
    video: IVideo;
}

function formatDuration(seconds: number) {
    if (!seconds || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
            <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gray-100">
                {video.avtart_image ? (
                    <img
                        src={video.avtart_image}
                        alt={video.video_name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <PlayCircle size={48} className="text-purple-500" />
                )}

                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                    {formatDuration(video.duration)}
                </span>
            </div>

            <div className="p-5">
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        video.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {video.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>

                <h3 className="mt-2 truncate font-semibold text-gray-900">
                    {video.video_name}
                </h3>

                {video.description ? (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {video.description}
                    </p>
                ) : null}

                <p className="mt-2 text-sm text-gray-500">
                    Ngày tạo: {moment(video.createdAt).format('DD/MM/YYYY')}
                </p>
            </div>
        </div>
    );
}
