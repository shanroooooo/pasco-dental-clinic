import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Menu, X, Bell } from 'lucide-react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <span className="text-xl font-bold text-indigo-600">My App</span>
                    <button
                        className="md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} className="mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between h-16 px-6">
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center space-x-4 ml-auto">
                            <button className="text-gray-600 hover:text-indigo-600 relative">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                U
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Layout;
