import { ChevronDown, Plus, Search } from 'lucide-react';
import React from 'react';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    sort: string;
    setSort: (value: string) => void;
}

function Header({ search, setSearch, sort, setSort }: Props) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-6 py-6">
                {/* Title + button */}
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold text-gray-800">
                        Danh sách Lĩnh vực
                    </h1>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <Plus size={20} />
                        Thêm lĩnh vực
                    </button>
                </div>

                {/* Search + sort */}
                <div className="mt-5 flex justify-end gap-2">
                    {/* Search */}
                    <div className="relative w-[450px]">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm"
                            className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                        />
                    </div>

                    {/* Sort */}
                    <button
                        type="button"
                        className="flex h-11 w-[225px] items-center justify-between rounded-xl border border-gray-300 bg-white px-5 text-sm text-gray-700"
                    >
                        <span>{sort}</span>
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
