import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputText from '@/components/common/InputText/Indenx';
import TextArea from '@/components/common/TextArea/Index';
import { fieldStudyService } from '@/services/FieldStudyService';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button/Index';

const CreateFieldStudy = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fieldStudyService.createdlFieldStudy(formData);
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
                                Thêm lĩnh vực mới
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Tạo một lĩnh vực học tập mới cho hệ thống của
                                bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    {/* ================= FORM ================= */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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

                                <InputText
                                    value={formData.name}
                                    onChange={(value) =>
                                        handleChange('name', value)
                                    }
                                    placeholder="Ví dụ: Computer Networks"
                                    maxLength={100}
                                    className="rounded-xl py-3.5"
                                />
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

                                <TextArea
                                    value={formData.description}
                                    onChange={(value) =>
                                        handleChange('description', value)
                                    }
                                    placeholder="Networking, protocols, and infrastructure"
                                    maxLength={500}
                                    rows={6}
                                />

                                <div className="mt-2 flex justify-between">
                                    <p className="text-xs text-slate-400">
                                        Mô tả ngắn gọn nội dung của lĩnh vực.
                                    </p>

                                    <span className="text-xs text-slate-400">
                                        {formData.description.length}/500
                                    </span>
                                </div>
                            </div>

                            {/* ================= ACTIONS ================= */}
                            <div
                                className="flex flex-col-reverse gap-3
                                           border-t border-slate-100 pt-6
                                           sm:flex-row sm:justify-end"
                            >
                                <Button
                                    variant="outline"
                                    type="secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Hủy
                                </Button>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={
                                        !formData.name.trim() ||
                                        !formData.description.trim()
                                    }
                                >
                                    Tạo lĩnh vực
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFieldStudy;
