import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Home, GraduationCap, Heart, Settings } from 'lucide-react';
import Navbar from './Navbar';

export default function DashboardLayout() {
    const menuItems = [
        { name: 'Dashboard', path: '/', icon: Home },
        { name: 'Lĩnh vực', path: '/field-study', icon: BookOpen },
        { name: 'Kỹ năng', path: '/skill', icon: Heart },
        { name: 'Certificates', path: '/certificates', icon: GraduationCap },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="h-screen overflow-hidden bg-gray-50">
            {/* Navbar */}
            <Navbar />

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

            {/* Content - chỉ khu vực này scroll */}
            <main className="ml-64 h-screen pt-16">
                <div className="h-full overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
