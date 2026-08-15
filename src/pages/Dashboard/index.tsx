import { BookOpen, Clock3, PlayCircle, Trophy, ArrowRight } from 'lucide-react';

const courses = [
    {
        title: 'React - The Complete Guide',
        instructor: 'John Smith',
        progress: 72,
        lessons: '18 / 25 lessons',
    },
    {
        title: 'TypeScript for Beginners',
        instructor: 'Sarah Wilson',
        progress: 45,
        lessons: '9 / 20 lessons',
    },
    {
        title: 'Advanced JavaScript',
        instructor: 'David Brown',
        progress: 28,
        lessons: '7 / 25 lessons',
    },
];

export default function Dashboard() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* Header */}
            <section>
                <p className="text-sm font-medium text-purple-600">
                    Welcome back 👋
                </p>

                <h1 className="mt-1 text-3xl font-bold text-gray-900">
                    Keep learning, John!
                </h1>

                <p className="mt-2 text-gray-500">
                    Continue your learning journey and achieve your goals.
                </p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <StatCard
                    icon={<BookOpen size={22} />}
                    title="Courses in progress"
                    value="3"
                />

                <StatCard
                    icon={<Clock3 size={22} />}
                    title="Learning hours"
                    value="24.5h"
                />

                <StatCard
                    icon={<Trophy size={22} />}
                    title="Certificates"
                    value="5"
                />
            </section>

            {/* Continue Learning */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Continue Learning
                    </h2>

                    <button className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700">
                        View all
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard key={course.title} {...course} />
                    ))}
                </div>
            </section>

            {/* Weekly Goal */}
            <section className="rounded-xl bg-purple-600 p-6 text-white">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <p className="text-sm text-purple-200">
                            Weekly learning goal
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            4.5 / 6 hours
                        </h2>

                        <p className="mt-1 text-sm text-purple-200">
                            You're almost there! Keep going.
                        </p>
                    </div>

                    <div className="w-full md:w-72">
                        <div className="mb-2 flex justify-between text-xs">
                            <span>Progress</span>
                            <span>75%</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-purple-400">
                            <div
                                className="h-full rounded-full bg-white"
                                style={{ width: '75%' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended */}
            <section>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Recommended for you
                </h2>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        'Next.js & React',
                        'UI/UX Design',
                        'Node.js Backend Development',
                    ].map((title) => (
                        <div
                            key={title}
                            className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-100">
                                <BookOpen
                                    size={40}
                                    className="text-purple-500"
                                />
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Learn practical skills from industry experts.
                            </p>

                            <button className="mt-4 text-sm font-semibold text-purple-600">
                                Explore course →
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                {icon}
            </div>

            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function CourseCard({
    title,
    instructor,
    progress,
    lessons,
}: {
    title: string;
    instructor: string;
    progress: number;
    lessons: string;
}) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white">
            <div className="flex h-36 items-center justify-center bg-gray-100">
                <PlayCircle size={45} className="text-purple-500" />
            </div>

            <div className="p-5">
                <h3 className="font-semibold text-gray-900">{title}</h3>

                <p className="mt-1 text-sm text-gray-500">{instructor}</p>

                <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs text-gray-500">
                        <span>{lessons}</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full bg-purple-600"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-purple-600">
                    Continue
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
