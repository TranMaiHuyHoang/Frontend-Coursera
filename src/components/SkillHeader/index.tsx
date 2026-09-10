import { Plus } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '../common/SearchInput';
import { FILTER_OPTIONS } from '@/constants/sort';
import CreateSkillModal from '../CreateSkillModal';
import type { ISkill } from '@/models/skill';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
    onCreated: (newSkill: ISkill) => void;
}

export default function SkillHeader({
    search,
    setSearch,
    filter,
    setFilter,
    onCreated,
}: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold text-gray-800">
                        Danh sách Kỹ năng
                    </h1>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <Plus size={20} />
                        Thêm kỹ năng
                    </button>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <SearchInput defaultValue={search} onSearch={setSearch} />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className='rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ringT-blue-500 focus:border-blue-500'
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <CreateSkillModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreated={onCreated}
            />
        </div>
    );
}
