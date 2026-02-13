import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const data = [
    { name: 'Jan', value: 400, sales: 2400 },
    { name: 'Feb', value: 300, sales: 1398 },
    { name: 'Mar', value: 600, sales: 9800 },
    { name: 'Apr', value: 800, sales: 3908 },
    { name: 'May', value: 500, sales: 4800 },
    { name: 'Jun', value: 700, sales: 3800 },
    { name: 'Jul', value: 400, sales: 4300 },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Icon size={24} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center font-medium">
                <TrendingUp size={16} className="mr-1" />
                {trend}
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="12,361" icon={Users} trend="+14%" />
                <StatCard title="Total Revenue" value="$43,500" icon={DollarSign} trend="+23%" />
                <StatCard title="Active Sessions" value="1,244" icon={Activity} trend="+8%" />
                <StatCard title="Conversion Rate" value="2.4%" icon={TrendingUp} trend="+4%" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#888888" />
                                <YAxis stroke="#888888" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#4f46e5' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Analytics</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#888888" />
                                <YAxis stroke="#888888" />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
