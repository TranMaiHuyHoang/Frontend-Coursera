import { Plus, SlidersHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../common/SearchInput';
import { FILTER_OPTIONS } from '@/constants/sort';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
}

function Header({ search, setSearch, filter, setFilter }: Props) {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeLabel = FILTER_OPTIONS.find((o) => o.value === filter)?.label ?? 'Bộ lọc';
    const isFiltered = filter !== FILTER_OPTIONS[0].value;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-6 py-6">
                {/* Title + buttons */}
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold text-gray-800">
                        Danh sách Lĩnh vực
                    </h1>

                    <div className="flex items-center gap-2">
                        {/* Filter button */}
                        <div ref={filterRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsFilterOpen((prev) => !prev)}
                                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition cursor-pointer
                                    ${isFiltered
                                        ? 'border-purple-500 bg-purple-50 text-purple-700 hover:bg-purple-100'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <SlidersHorizontal size={16} />
                                <span>{isFiltered ? activeLabel : 'Bộ lọc'}</span>
                                {isFiltered && (
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                                        1
                                    </span>
                                )}
                            </button>

                            {/* Dropdown modal */}
                            {isFilterOpen && (
                                <div className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                                    {/* Header của dropdown */}
                                    <div className="border-b border-gray-100 px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            Sắp xếp theo
                                        </p>
                                    </div>

                                    {/* Danh sách lựa chọn */}
                                    <ul className="py-1">
                                        {FILTER_OPTIONS.map((option) => {
                                            const isActive = filter === option.value;
                                            return (
                                                <li key={option.value}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFilter(option.value);
                                                            setIsFilterOpen(false);
                                                        }}
                                                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition
                                                            ${isActive
                                                                ? 'bg-purple-50 text-purple-700 font-semibold'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {/* Radio indicator */}
                                                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition
                                                            ${isActive ? 'border-purple-600' : 'border-gray-300'}`}>
                                                            {isActive && (
                                                                <span className="h-2 w-2 rounded-full bg-purple-600" />
                                                            )}
                                                        </span>
                                                        {option.label}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Thêm lĩnh vực button */}
                        <button
                            onClick={() => navigate('/created-fieldStudy')}
                            type="button"
                            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 cursor-pointer"
                        >
                            <Plus size={20} />
                            Thêm lĩnh vực
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <div className="mt-5 flex justify-end gap-2">
                    <SearchInput defaultValue={search} onSearch={setSearch} />
                </div>
            </div>
        </div>
    );
}

export default Header;
