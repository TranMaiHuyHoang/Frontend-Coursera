import type { IFieldStudy } from '@/models/fieldStudy';
import { Edit2 } from 'lucide-react';
import { Uml } from '@thesvg/react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

function FieldCard({ field }: { field: IFieldStudy }) {
    const navigate = useNavigate();

    return (
        <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Card content */}
            <Link to={`/field-study/${field._id}`} className="block">
                <div className="flex min-h-[110px] items-center gap-3 px-4 py-4">
                    <Uml className="h-15 w-15" />

                    <div className="min-w-0 flex-1 self-stretch pt-1">
                        <h3 className="truncate text-[18px] font-semibold text-gray-800">
                            {field.name}
                        </h3>

                        <p className="mt-1 truncate text-sm text-gray-500">
                            {field.description}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                <span className="text-sm text-gray-600">
                    Ngày tạo: {moment(field.createdAt).format('DD/MM/YYYY')}
                </span>

                <button
                    onClick={() => navigate(`/update-fieldStudy/${field._id}`)}
                    type="button"
                    className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                >
                    <Edit2 size={21} />
                </button>
            </div>
        </div>
    );
}

export default FieldCard;
