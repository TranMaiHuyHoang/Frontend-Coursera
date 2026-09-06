import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import type { ILanguage } from '@/models/language';
import { languageService } from '@/services/LanguageService';
import LanguageCard from '@/components/LanguageCard';
import LanguageHeader from '@/components/LanguageHeader';
import { toast } from 'react-toastify';
import { FILTER_OPTIONS } from '@/constants/sort';

export default function Language() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);

    const {
        data: languages,
        setData: setLanguages,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<ILanguage[]>({
        fetchFn: async () => {
            const res = await languageService.getListLanguage({
                keyword: search,
                filter: filter,
            });
            return res.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [search, filter]);

    const handleDeleteLanguage = async (languageId: string) => {
        try {
            const res = await languageService.deleteLanguage({
                languageId: languageId,
            });
            if (res.statusCode === 200) {
                setLanguages((prevLanguages) =>
                    prevLanguages.filter(
                        (language) => language._id !== languageId,
                    ),
                );
                toast.success('Xoá Ngôn Ngữ thành công');
            }
        } catch (error) {
            toast.error('Xoá Ngôn Ngữ thất bại');
        }
    };

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
                <LanguageHeader
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            {/* List - chỉ phần này cuộn */}
            <main className="min-h-0 flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {languages?.map((language) => (
                        <LanguageCard
                            key={language._id}
                            language={language}
                            onDelete={handleDeleteLanguage}
                        />
                    ))}
                </div>

                {languages?.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy ngôn ngữ nào
                    </div>
                )}
            </main>
        </div>
    );
}
