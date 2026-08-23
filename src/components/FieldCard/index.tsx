import type { IFieldStudy } from '@/models/fieldStudy';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Uml } from '@thesvg/react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function StatusBadge({ status }: { status: IFieldStudy['isActive'] }) {
    const ready = status === true;

    return (
        <span
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                ready
                    ? 'bg-blue-50 text-blue-500'
                    : 'bg-orange-50 text-orange-400'
            }`}
        >
            {status}
            <ChevronDown size={13} />
        </span>
    );
}

function FieldCard({ field }: { field: IFieldStudy }) {
    return (
        <Link
            to={`/field-study/${field._id}`}
            className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
            {/* Card content */}
            <div className="flex min-h-[110px] items-center gap-3 px-4 py-4">
                <Uml className="h-15 w-15" />

                <div className="min-w-0 flex-1 self-stretch pt-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="truncate text-[18px] font-semibold text-gray-800">
                            {field.name}
                        </h3>

                        <StatusBadge status={field.isActive} />
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-500">
                        {field.description}
                    </p>
                </div>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                <span className="text-sm text-gray-600">
                    Ngày tạo: {moment(field.createdAt).format('DD/MM/YYYY')}
                </span>

                <button
                    type="button"
                    className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                >
                    <MoreHorizontal size={21} />
                </button>
            </div>
        </Link>
    );
}

export default FieldCard;
