import { useEffect, useState } from 'react';
import type { IFieldStudy } from '@/models/fieldStudy';
import Header from '@/components/FieldStudy/Header';
import FieldCard from '@/components/FieldCard';
import FieldCardSkeleton from '@/components/FieldCard/FieldCardSkeleton';
import { fieldStudyService } from '@/services/FieldStudyService';
import { toast } from 'react-toastify';
import { FILTER_OPTIONS } from '@/constants/sort';

export default function FieldStudy() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);
    const [fieldStudies, setFieldStudies] = useState<IFieldStudy[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fieldStudyService.getListFieldStudies({
                    page: 1,
                    limit: 10,
                    ...(search ? { keyword: search } : {}),
                    filter: filter,
                });
                if (!cancelled) {
                    setFieldStudies(res.data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    setFieldStudies(null);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [search, filter]);

    const handleDeleteFieldStudy = async (fieldStudyId: string) => {
        try {
            const res = await fieldStudyService.deleteFieldStudy({
                fieldStudyId: fieldStudyId,
            });
            if (res.statusCode === 200) {
                setFieldStudies((prev) =>
                    prev ? prev.filter((field) => field._id !== fieldStudyId) : [],
                );
                toast.success('Xoá lĩnh vực thành công');
            }
        } catch (error) {
            toast.error('Xoá lĩnh vực thất bại');
        }
    };

    return (
        <div className="flex h-full flex-col bg-[#f8f9fa]">
            {/* Header - luôn giữ nguyên, không tải lại */}
            <div className="shrink-0">
                <Header
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            {/* List - chỉ khu vực này cập nhật dữ liệu và hiển thị skeleton */}
            <main className="min-h-0 flex-1 overflow-y-auto p-5">
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <FieldCardSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex h-40 items-center justify-center text-red-500">
                        Đã có lỗi xảy ra khi tải dữ liệu
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {fieldStudies?.map((field) => (
                                <FieldCard
                                    key={field._id}
                                    field={field}
                                    onDelete={handleDeleteFieldStudy}
                                />
                            ))}
                        </div>

                        {fieldStudies?.length === 0 && (
                            <div className="flex h-40 items-center justify-center text-gray-500">
                                Không tìm thấy lĩnh vực nào
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
