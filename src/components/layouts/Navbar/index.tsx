import { Bell, GraduationCap, Search, User } from 'lucide-react';
import React from 'react';

function Navbar() {
    return (
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
    );
}

export default Navbar;
