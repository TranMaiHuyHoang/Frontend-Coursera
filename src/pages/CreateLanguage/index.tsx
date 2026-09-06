import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { languageService } from '@/services/LanguageService';

export default function CreateLanguage() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await languageService.createLanguage({
                name,
                description,
                isActive,
            });
            toast.success('Thêm ngôn ngữ thành công!');
            navigate('/language');
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi thêm ngôn ngữ!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-[20px] font-bold text-gray-800">
                Thêm Ngôn Ngữ Mới
            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div className="mb-5">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Tên Ngôn Ngữ
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                        placeholder="Nhập tên Ngôn Ngữ..."
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-5">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Mô tả
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 disabled:opacity-50"
                        placeholder="Mô tả chi tiết Ngôn Ngữ..."
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-8 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-cyan-500 cursor-pointer disabled:opacity-50"
                        id="active-checkbox"
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="active-checkbox"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        Đang hoạt động
                    </label>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/language')}
                        disabled={isLoading}
                        className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Đang lưu...' : 'Lưu Ngôn Ngữ'}
                    </button>
                </div>
            </form>
        </div>
    );
}
