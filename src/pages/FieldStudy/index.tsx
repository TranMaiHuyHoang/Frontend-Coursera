import { useEffect, useState } from 'react';
import type { IFieldStudy } from '@/models/fieldStudy';
import Header from '@/components/FieldStudy/Header';
import FieldCard from '@/components/FieldCard';
import useFetch from '@/hooks/useFetch';
import { fieldStudyService } from '@/services/FieldStudyService';

export default function FieldStudy() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Ngày tạo mới nhất');

    const {
        data: fieldStudies,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<IFieldStudy[]>({
        fetchFn: async () => {
            const res = await fieldStudyService.getListFieldStudies({});
            return res.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('Error:', error);
        return <div>Error loading data</div>;
    }

    return (
        <div className="flex h-full flex-col bg-[#f8f9fa]">
            {/* Header - không cuộn */}
            <div className="shrink-0">
                <Header
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                />
            </div>

            {/* List - chỉ phần này cuộn */}
            <main className="min-h-0 flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {fieldStudies?.map((field) => (
                        <FieldCard key={field._id} field={field} />
                    ))}
                </div>

                {fieldStudies?.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy lĩnh vực nào
                    </div>
                )}
            </main>
        </div>
    );
}
