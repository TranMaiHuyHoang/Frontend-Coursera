function FieldCardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Card content skeleton */}
            <div className="flex min-h-[110px] items-center gap-3 px-4 py-4">
                {/* Icon skeleton */}
                <div className="h-15 w-15 shrink-0 rounded-lg bg-gray-200" />

                {/* Text skeleton */}
                <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
            </div>

            {/* Card footer skeleton */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                <div className="h-4 w-32 rounded bg-gray-200" />

                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded bg-gray-200" />
                    <div className="h-6 w-6 rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export default FieldCardSkeleton;
