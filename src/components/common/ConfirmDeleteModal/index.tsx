interface ConfirmDeleteModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({
    isOpen,
    title,
    description,
    loading = false,
    onCancel,
    onConfirm,
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <h2 className="text-lg font-semibold">{title}</h2>

                <p className="mt-2 text-sm text-gray-500">{description}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Huỷ
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? 'Đang xoá...' : 'Xoá'}
                    </button>
                </div>
            </div>
        </div>
    );
}
