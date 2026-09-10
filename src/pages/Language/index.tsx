import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import type { ILanguage } from '@/models/language';
import { languageService } from '@/services/LanguageService';
import LanguageCard from '@/components/LanguageCard';
import LanguageHeader from '@/components/LanguageHeader';
import { toast } from 'react-toastify';
import { FILTER_OPTIONS } from '@/constants/sort';
import usePaginationList from '@/hooks/usePaginationList';
import useScrollToEnd from '@/hooks/useScrollToEnd';

export default function Language() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);

    const {
        list: languages,
        setList: setLanguages,
        // isSkeletonLoading, return toán tử 3 ngôi
        loadFirstPage,
        loadMore,
    } = usePaginationList<ILanguage>({
        fetchFn: async (payload) => {
            const res = await languageService.getListLanguage(payload);
            return res.data;
        },
        limit: 15,
        params: { keyword: search, filter: filter },
    });

    useEffect(() => {
        loadFirstPage();
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

    const handleCreate = (newlanguage: ILanguage) => {
        setLanguages((prevLanguages) => [newlanguage, ...prevLanguages]);
    };

    const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });

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
            <main
                className="min-h-0 flex-1 overflow-y-auto p-5"
                ref={containerRef}
            >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {languages?.map((language) => (
                        <LanguageCard
                            key={language._id}
                            language={language}
                            onDelete={handleDeleteLanguage}
                            onCreated={(language) => handleCreate(language)}
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
