import { Outlet, NavLink } from 'react-router-dom';
import {
    BookOpen,
    Home,
    GraduationCap,
    Heart,
    Settings,
    Search,
    Bell,
    User,
} from 'lucide-react';

export default function DashboardLayout() {
    const menuItems = [
        { name: 'Dashboard', path: '/', icon: Home },
        { name: 'My Learning', path: '/my-learning', icon: BookOpen },
        { name: 'Wishlist', path: '/wishlist', icon: Heart },
        { name: 'Certificates', path: '/certificates', icon: GraduationCap },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white">
                <div className="flex h-full items-center px-6">
                    {/* Logo */}
                    <div className="flex w-64 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600">
                            <GraduationCap className="text-white" size={22} />
                        </div>

                        <span className="text-xl font-bold text-gray-900">
                            Coursera
                        </span>
                    </div>

                    {/* Search */}
                    <div className="relative w-96">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="What do you want to learn?"
                            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-600"
                        />
                    </div>

                    {/* Right */}
                    <div className="ml-auto flex items-center gap-5">
                        <button className="text-gray-600 hover:text-purple-600">
                            <Bell size={21} />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
                                <User size={18} className="text-purple-600" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    John Doe
                                </p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside className="fixed left-0 top-16 bottom-0 w-64 border-r bg-white">
                <div className="p-4">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
                        Learning
                    </p>

                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                            isActive
                                                ? 'bg-purple-50 text-purple-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <main className="ml-64 pt-16">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
