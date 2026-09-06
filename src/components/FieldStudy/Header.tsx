import { ChevronDown, Plus, Search } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../common/SearchInput';


interface Props {
    search: string;
    setSearch: (value: string) => void;
}

function Header({ search, setSearch }: Props) {
    const navigate = useNavigate ()
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-6 py-6">
                {/* Title + button */}
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold text-gray-800">
                        Danh sách Lĩnh vực
                    </h1>

                    <button
                        onClick={() => navigate('/created-fieldStudy')}
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <Plus size={20} />
                        Thêm lĩnh vực
                    </button>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <SearchInput defaultValue={search} onSearch={setSearch} />
                </div>
            </div>
        </div>
    );
}

export default Header;
