import { useState } from 'react';
import { Plus, Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import type { IFieldStudy } from '@/models/fieldStudy';
import Header from '@/components/FieldStudy/Header';
import FieldCard from '@/components/FieldCard';

const mockFields: IFieldStudy[] = [
    {
        id: 1,
        name: 'Computer Networks - Copy',
        description: 'Networking, protocols, and infrastructure',
        createdAt: '27/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 2,
        name: 'Computer Networks',
        description: 'Networking, protocols, and infrastructure',
        createdAt: '27/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 3,
        name: 'DevOps3',
        description: 'DevOps3',
        createdAt: '27/05/2026',
        status: 'Chưa sẵn sàng',
    },
    {
        id: 4,
        name: 'DevOps2',
        description: 'DevOps',
        createdAt: '27/05/2026',
        status: 'Chưa sẵn sàng',
    },
    {
        id: 5,
        name: 'DevOps',
        description: 'DevOps',
        createdAt: '27/05/2026',
        status: 'Chưa sẵn sàng',
    },
    {
        id: 6,
        name: 'Design 1',
        description: 'Design',
        createdAt: '27/05/2026',
        status: 'Chưa sẵn sàng',
    },
    {
        id: 7,
        name: 'Design',
        description: 'Design',
        createdAt: '27/05/2026',
        status: 'Chưa sẵn sàng',
    },
    {
        id: 8,
        name: 'Embedded Systems',
        description: 'Embedded Systems',
        createdAt: '25/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 9,
        name: 'DevOps & System Administration',
        description: 'DevOps & System Administration',
        createdAt: '25/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 10,
        name: 'Cloud Computing (Điện toán đám mây)',
        description: 'Cloud Computing (Điện toán đám mây)',
        createdAt: '25/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 11,
        name: 'Data Science & Big Data',
        description: 'Data Science & Big Data',
        createdAt: '25/05/2026',
        status: 'Sẵn sàng',
    },
    {
        id: 12,
        name: 'Artificial Intelligence',
        description: 'Artificial Intelligence',
        createdAt: '25/05/2026',
        status: 'Sẵn sàng',
    },
];

export default function FieldStudy() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Ngày tạo mới nhất');

    const filteredFields = mockFields
        .filter((field) =>
            `${field.name} ${field.description}`
                .toLowerCase()
                .includes(search.toLowerCase()),
        )
        .sort((a, b) => {
            if (sort === 'Tên A-Z') {
                return a.name.localeCompare(b.name);
            }

            return b.id - a.id;
        });

    return (
        <div className=" bg-[#f8f9fa]">
            {/* Header */}
            <Header
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
            />

            {/* List */}
            <main className="h-[calc(100vh-157px)] overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredFields.map((field) => (
                        <FieldCard key={field.id} field={field} />
                    ))}
                </div>

                {filteredFields.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-gray-500">
                        Không tìm thấy lĩnh vực nào
                    </div>
                )}
            </main>
        </div>
    );
}
