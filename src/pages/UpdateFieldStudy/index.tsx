import InputText from '@/components/common/InputText/Indenx';
import TextArea from '@/components/common/TextArea/Index';
import useFetch from '@/hooks/useFetch';
import type { IFieldStudy } from '@/models/fieldStudy';
import { fieldStudyService } from '@/services/FieldStudyService';
import {
    ArrowLeft,
    BookOpen,
    Save,
    Sparkles,
    Type,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateFieldStudy = () => {
    const { fieldId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const {
        data: fieldStudy,
        isLoading,
        error,
        loadFetchFn,
    } = useFetch<IFieldStudy>({
        fetchFn: async () => {
            const res = await fieldStudyService.getDetailFieldStudy({
                fieldStudyId: fieldId,
            });

            return res.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [fieldId]);

    useEffect(() => {
        if (fieldStudy) {
            setFormData({
                name: fieldStudy.name,
                description: fieldStudy.description,
            });
        }
    }, [fieldStudy]);

    const handleSubmit = async () => {
        try {
            const res = await fieldStudyService.updateFieldStudy({
                fieldStudyId: fieldId,
                name: formData.name,
                description: formData.description,
            });
            if (res.statusCode === 200) {
                setFormData({
                    name: '',
                    description: '',
                });
                navigate(-1);

                toast.success(res.message);
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi tạo lĩnh vực.');
        }
    };

    console.log('formData:', formData);

    if (isLoading) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        console.error('Error:', error);

        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
                    Error loading field study
                </div>
            </div>
        );
    }

    if (!fieldStudy) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">
                    Field study not found
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl">
                {/* ================= HEADER ================= */}
                <div className="mb-8">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mb-5 flex items-center gap-2 text-sm
                                   font-medium text-slate-500 transition
                                   hover:text-slate-900"
                    >
                        <ArrowLeft size={18} />
                        Quay lại danh sách lĩnh vực
                    </button>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span
                                    className="rounded-full bg-indigo-100
                                               px-3 py-1 text-xs font-semibold
                                               text-indigo-600"
                                >
                                    FIELD MANAGEMENT
                                </span>

                                <Sparkles
                                    size={16}
                                    className="text-indigo-500"
                                />
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Cập Nhật lĩnh vực
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Cập nhật một lĩnh vực học tập mới cho hệ thống
                                của bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    {/* ================= FORM ================= */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* Form header */}
                        <div className="border-b border-slate-100 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 items-center
                                               justify-center rounded-xl
                                               bg-indigo-50 text-indigo-600"
                                >
                                    <BookOpen size={20} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        Thông tin lĩnh vực
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Nhập thông tin cơ bản của lĩnh vực
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form body */}
                        <div className="space-y-6 p-6">
                            {/* ================= NAME ================= */}
                            <div>
                                <label
                                    htmlFor="field-name"
                                    className="mb-2 block text-sm font-semibold
                                               text-slate-700"
                                >
                                    Tên lĩnh vực
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <Type
                                        size={18}
                                        className="pointer-events-none
                                                   absolute left-4 top-1/2
                                                   z-10 -translate-y-1/2
                                                   text-slate-400"
                                    />

                                    <InputText
                                        value={formData.name}
                                        onChange={(value) =>
                                            handleChange('name', value)
                                        }
                                        placeholder="Ví dụ: Computer Networks"
                                        maxLength={100}
                                        className="rounded-xl py-3.5 pl-11"
                                    />
                                </div>

                                <div className="mt-2 flex justify-between">
                                    <p className="text-xs text-slate-400">
                                        Tên nên ngắn gọn và dễ hiểu.
                                    </p>

                                    <span className="text-xs text-slate-400">
                                        {formData.name.length}/100
                                    </span>
                                </div>
                            </div>

                            {/* ================= DESCRIPTION ================= */}
                            <div>
                                <label
                                    htmlFor="field-description"
                                    className="mb-2 block text-sm font-semibold
                                               text-slate-700"
                                >
                                    Mô tả
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <div className="relative">


                                    <TextArea
                                        value={formData.description}
                                        onChange={(value) =>
                                            handleChange('description', value)
                                        }
                                        placeholder="Networking, protocols, and infrastructure"
                                        maxLength={500}
                                        rows={6}
                                    />
                                </div>

                                <div className="mt-2 flex justify-between">
                                    <p className="text-xs text-slate-400">
                                        Mô tả ngắn gọn nội dung của lĩnh vực.
                                    </p>

                                    <span className="text-xs text-slate-400">
                                        {formData.description.length}/500
                                    </span>
                                </div>
                            </div>

                            {/* ================= TIP ================= */}
                            <div
                                className="rounded-xl border border-indigo-100
                                           bg-indigo-50/60 p-4"
                            >
                                <div className="flex gap-3">
                                    <div className="mt-0.5 text-indigo-600">
                                        <Sparkles size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-indigo-900">
                                            Mẹo tạo lĩnh vực
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-indigo-700">
                                            Hãy sử dụng tên rõ ràng và mô tả
                                            ngắn gọn để người học dễ dàng hiểu
                                            nội dung của lĩnh vực.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ================= ACTIONS ================= */}
                            <div
                                className="flex flex-col-reverse gap-3
                                           border-t border-slate-100 pt-6
                                           sm:flex-row sm:justify-end"
                            >
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="rounded-xl border
                                               border-slate-200 px-5 py-3
                                               text-sm font-semibold
                                               text-slate-600 transition
                                               hover:bg-slate-50"
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
                                    className="flex items-center
                                               justify-center gap-2
                                               rounded-xl bg-indigo-600
                                               px-6 py-3 text-sm
                                               font-semibold text-white
                                               shadow-sm transition
                                               hover:bg-indigo-700
                                               hover:shadow-md
                                               disabled:cursor-not-allowed
                                               disabled:opacity-50
                                               disabled:hover:bg-indigo-600"
                                >
                                    <Save size={18} />
                                    Tạo lĩnh vực
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFieldStudy;
