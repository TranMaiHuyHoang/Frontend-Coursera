import InputText from '@/components/common/InputText/Indenx';
import TextArea from '@/components/common/TextArea/Index';
import useFetch from '@/hooks/useFetch';
import type { ILanguage } from '@/models/language';
import { languageService } from '@/services/LanguageService';
import {
    Activity,
    ArrowLeft,
    BookOpen,
    Save,
    Sparkles,
    Type,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateLanguage = () => {
    // Đổi skillId thành languageId
    const { languageId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: true,
    });

    const handleChange = (key: string, value: string | boolean) => {
        setFormData({ ...formData, [key]: value });
    };

    const {
        data: language,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<ILanguage>({
        fetchFn: async () => {
            const res = await languageService.getDetailLanguage({
                languageId: languageId,
            });
            return res.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [languageId]);

    useEffect(() => {
        if (language) {
            setFormData({
                name: language.name,
                description: language.description || '',
                isActive: language.isActive ?? true,
            });
        }
    }, [language]);

    const handleSubmit = async () => {
        try {
            const res = await languageService.updateLanguage({
                languageId: languageId as string,
                name: formData.name,
                description: formData.description,
                isActive: formData.isActive,
            });
            if (res.statusCode === 200 || res.data) {
                navigate(-1);
                toast.success(res.message || 'Cập nhật ngôn ngữ thành công!');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi cập nhật ngôn ngữ.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
                    Error loading language
                </div>
            </div>
        );
    }

    if (!language) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">Language not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={18} />
                        Quay lại danh sách ngôn ngữ
                    </button>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <Sparkles
                                    size={16}
                                    className="text-indigo-500"
                                />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Cập Nhật Ngôn Ngữ
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Điều chỉnh thông tin ngôn ngữ trong hệ thống của
                                bạn.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        Thông tin ngôn ngữ
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Cập nhật nội dung chi tiết của ngôn ngữ
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Tên ngôn ngữ{' '}
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Type
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                    />
                                    <InputText
                                        value={formData.name}
                                        onChange={(value) =>
                                            handleChange('name', value)
                                        }
                                        placeholder="Ví dụ: Tiếng Anh, Tiếng Nhật..."
                                        maxLength={100}
                                        className="rounded-xl py-3.5 pl-11"
                                    />
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <p className="text-xs text-slate-400">
                                        Tên nên ngắn gọn, rõ ràng.
                                    </p>
                                    <span className="text-xs text-slate-400">
                                        {formData.name.length}/100
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Mô tả{' '}
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <TextArea
                                        value={formData.description}
                                        onChange={(value) =>
                                            handleChange('description', value)
                                        }
                                        placeholder="Mô tả chi tiết ngôn ngữ..."
                                        maxLength={500}
                                        rows={6}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <p className="text-xs text-slate-400">
                                        Mô tả ngắn gọn nội dung của ngôn ngữ.
                                    </p>
                                    <span className="text-xs text-slate-400">
                                        {formData.description.length}/500
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Trạng thái
                                </label>
                                <div className="flex items-center gap-3">
                                    <Activity
                                        size={18}
                                        className="text-slate-400"
                                    />
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) =>
                                                handleChange(
                                                    'isActive',
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">
                                            Đang hoạt động
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                                <div className="flex gap-3">
                                    <div className="mt-0.5 text-indigo-600">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-indigo-900">
                                            Mẹo tạo ngôn ngữ
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-indigo-700">
                                            Viết tên ngôn ngữ chuẩn quốc tế giúp
                                            ứng viên dễ dàng tìm kiếm.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={
                                        !formData.name.trim() ||
                                        !formData.description.trim()
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateLanguage;
