import type { ILanguage } from '@/models/language';
import { Edit2, Trash2 } from 'lucide-react';
import { Uml } from '@thesvg/react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDeleteModal from '../common/ConfirmDeleteModal';

interface LanguageCardProps {
    language: ILanguage;
    onDelete: (languageId: string) => Promise<void>;
}

export default function LanguageCard({
    language,
    onDelete,
}: LanguageCardProps) {
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        await onDelete(language._id);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                {/* Phần nội dung thẻ bấm vào sẽ xem chi tiết */}
                <Link to={`/language/${language._id}`} className="block">
                    <div className="flex min-h-[110px] items-center gap-3 px-4 py-4">
                        <Uml className="h-15 w-15" />
                        <div className="min-w-0 flex-1 self-stretch pt-1">
                            <h3 className="truncate text-[18px] font-semibold text-gray-800">
                                {language.name}
                            </h3>
                            <p className="mt-1 truncate text-sm text-gray-500">
                                {language.description}
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Phần Footer chứa nút Chỉnh sửa và Xóa */}
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                    <span className="text-sm text-gray-600">
                        Ngày tạo:{' '}
                        {moment(language.createdAt).format('DD/MM/YYYY')}
                    </span>

                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Ngăn chặn hành vi mặc định
                            e.stopPropagation(); // Ngăn chặn nhầm lẫn click với thẻ cha
                            navigate(`/update-language/${language._id}`);
                        }}
                        type="button"
                        className="flex items-center justify-center rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                        <Edit2 size={21} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Ngăn chặn hành vi mặc định
                            e.stopPropagation(); // Ngăn chặn nhầm lẫn click với thẻ cha
                            setIsDeleteModalOpen(true);
                        }}
                        type="button"
                        className="flex items-center justify-center rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                        <Trash2 size={21} />
                    </button>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                title="Xoá Ngôn Ngữ"
                description="Bạn có chắc chắn muốn xoá ngôn ngữ này? Hành động này không thể hoàn tác."
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
