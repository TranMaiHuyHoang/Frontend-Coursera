import { Plus } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../common/SearchInput';
import { FILTER_OPTIONS } from '@/constants/sort';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
}

export default function LanguageHeader({
    search,
    setSearch,
    filter,
    setFilter,
}: Props) {
    const navigate = useNavigate();

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold text-gray-800">
                        Danh sách Ngôn ngữ
                    </h1>

                    <button
                        onClick={() => navigate('/create-language')}
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <Plus size={20} />
                        Thêm ngôn ngữ
                    </button>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <SearchInput defaultValue={search} onSearch={setSearch} />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ringT-blue-500 focus:border-blue-500"
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
