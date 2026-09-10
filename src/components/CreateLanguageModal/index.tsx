import { useState } from 'react';
import { toast } from 'react-toastify';
import { languageService } from '@/services/LanguageService';
import type { ILanguage } from '@/models/language';

interface CreateLanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: (newLanguage: ILanguage) => void;
}

export default function CreateLanguageModal({
    isOpen,
    onClose,
    onCreated,
}: CreateLanguageModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const resetForm = () => {
        setName('');
        setDescription('');
        setIsActive(true);
    };

    const handleClose = () => {
        if (isLoading) return;

        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await languageService.createLanguage({
                name: name.trim(),
                description: description.trim(),
                isActive,
            });

            toast.success('Thêm ngôn ngữ thành công!');

            resetForm();
            onClose();
            onCreated?.(res.data);
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi thêm ngôn ngữ!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Thêm Ngôn Ngữ Mới
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-2xl leading-none text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
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
                            id="active-checkbox"
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            disabled={isLoading}
                            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-cyan-500 disabled:opacity-50"
                        />

                        <label
                            htmlFor="active-checkbox"
                            className="cursor-pointer text-sm font-medium text-gray-700"
                        >
                            Đang hoạt động
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
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
        </div>
    );
}
