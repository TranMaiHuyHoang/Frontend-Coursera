import useFetch from '@/hooks/useFetch';
import type { ILanguage } from '@/models/language';
import { languageService } from '@/services/LanguageService';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const LanguageDetail = () => {
    const { languageId } = useParams();

    const {
        data: languages,
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
    }, []);

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

    if (!languages) {
        return (
            <div className="flex min-h-full items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">
                    Field study not found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
                        <Link
                            to={`/language`}
                            className="cursor-pointer hover:text-blue-600"
                        >
                            Language
                        </Link>

                        <span>/</span>

                        <span className="text-slate-800">{languages.name}</span>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        {/* Title */}
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        languages.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {languages.isActive
                                        ? 'Đang hoạt động'
                                        : 'Không hoạt động'}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                {languages.name}
                            </h1>

                            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                                {languages.description}
                            </p>
                        </div>

                        {/* Icon */}
                        <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-blue-50 lg:flex">
                            <svg
                                className="h-12 w-12 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Description */}
                        <section className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">
                                Giới thiệu lĩnh vực
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                {languages.description}
                            </p>
                        </section>

                        {/* Learning */}
                        <section className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">
                                Bạn sẽ học được gì?
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[
                                    'Nắm vững kiến thức nền tảng của lĩnh vực',
                                    'Phát triển kỹ năng thực hành',
                                    'Áp dụng kiến thức vào các dự án thực tế',
                                    'Phát triển khả năng giải quyết vấn đề',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <svg
                                                className="h-3.5 w-3.5 text-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>

                                        <span className="text-sm leading-6 text-slate-600">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900">
                                Thông tin lĩnh vực
                            </h2>

                            <div className="mt-6 divide-y">
                                {/* Status */}
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-sm text-slate-500">
                                        Trạng thái
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            languages.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {languages.isActive
                                            ? 'Đang hoạt động'
                                            : 'Không hoạt động'}
                                    </span>
                                </div>

                                {/* Created */}
                                <div className="flex flex-col gap-1 py-4">
                                    <span className="text-sm text-slate-500">
                                        Ngày tạo
                                    </span>

                                    <span className="text-sm font-medium text-slate-900">
                                        {languages.createdAt}
                                    </span>
                                </div>

                                {/* ID */}
                                <div className="flex flex-col gap-1 py-4">
                                    <span className="text-sm text-slate-500">
                                        Field ID
                                    </span>

                                    <span className="break-all font-mono text-xs text-slate-700">
                                        {languages._id}
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            <button
                                type="button"
                                className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                            >
                                Xem khóa học
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default LanguageDetail;
