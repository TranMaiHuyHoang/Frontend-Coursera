import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import type { ISkill } from '@/models/skill';
import { skillService } from '@/services/SkillService';
import SkillCard from '@/components/Skill/SkillCard';
import SkillHeader from '@/components/SkillHeader';
import { toast } from 'react-toastify';
import { FILTER_OPTIONS } from '@/constants/sort';


export default function Skill() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);

    // console.log('search', search);

    const {
        data: skills,
        setData: setSkills,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<ISkill[]>({
        fetchFn: async () => {
            const res = await skillService.getListSkills({
                keyword: search,
                filter:filter,
            });
            return res.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [search,filter]);

    const handleDeleteSkill = async (skillId: string) => {
        try {
            const res = await skillService.deleteSkill({
                skillId: skillId,
            });
            if (res.statusCode === 200) {
                setSkills((prevSkills) =>
                    prevSkills.filter((skill) => skill._id !== skillId),
                );
                toast.success('Xoá Kỹ Năng thành công');
            }
        } catch (error) {
            toast.error('Xoá Kỹ Năng thất bại');
        }
    };

    const handleCreateSkill = (newSkill: ISkill) => {
        setSkills((prevSkills) => [newSkill, ...prevSkills]);
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
                <SkillHeader
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    onCreated={handleCreateSkill}
                />
            </div>

            {/* List - chỉ phần này cuộn */}
            <main className="min-h-0 flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {skills?.map((skill) => (
                        <SkillCard
                            key={skill._id}
                            skill={skill}
                            onDelete={handleDeleteSkill}
                        />
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
