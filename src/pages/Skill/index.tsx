import { useEffect, useState } from 'react';
import type { IFieldStudy } from '@/models/fieldStudy';
import Header from '@/components/FieldStudy/Header';
import FieldCard from '@/components/FieldCard';
import useFetch from '@/hooks/useFetch';
import { fieldStudyService } from '@/services/FieldStudyService';
import type { ISkill } from '@/models/skill';
import { skillService } from '@/services/SkillService';
import SkillCard from '@/components/Skill/SkillCard';

export default function Skill() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Ngày tạo mới nhất');

    const {
        data: skills,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<ISkill[]>({
        fetchFn: async () => {
            const res = await skillService.getListSkills({});
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
                    {skills?.map((skill) => (
                        <SkillCard key={skill._id} skill={skill} />
                    ))}
                </div>

                {skills?.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy lĩnh vực nào
                    </div>
                )}
            </main>
        </div>
    );
}
