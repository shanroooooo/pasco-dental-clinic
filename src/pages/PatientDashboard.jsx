import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, FileText, MessageCircle, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PatientDashboard = () => {
    const upcomingAppointment = {
        date: '2024-02-28',
        time: '10:30 AM',
        service: 'Regular Check-up',
        dentist: 'Dr. Sarah Johnson',
        duration: '45 minutes'
    };

    const recentActivity = [
        {
            id: 1,
            type: 'appointment',
            title: 'Completed Cleaning',
            date: '2024-02-15',
            status: 'completed',
            notes: 'Teeth cleaning completed successfully'
        },
        {
            id: 2,
            type: 'treatment',
            title: 'Filling Procedure',
            date: '2024-02-10',
            status: 'completed',
            notes: 'Cavity filled on tooth #19'
        },
        {
            id: 3,
            type: 'message',
            title: 'Reminder from Clinic',
            date: '2024-02-08',
            status: 'info',
            notes: 'Don\'t forget your upcoming appointment'
        }
    ];

    const treatmentProgress = [
        {
            treatment: 'Orthodontic Treatment',
            progress: 65,
            nextStep: 'Adjustment appointment',
            estimatedCompletion: '2024-06-15'
        },
        {
            treatment: 'Teeth Whitening',
            progress: 100,
            nextStep: 'Maintenance',
            estimatedCompletion: 'Completed'
        }
    ];

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center font-medium">
                        <TrendingUp size={16} className="mr-1" />
                        {trend}
                    </span>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
                <p className="text-gray-600">Here's your dental health overview and upcoming appointments.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Next Appointment" 
                    value="Feb 28" 
                    icon={Calendar} 
                    color="bg-teal-500"
                />
                <StatCard 
                    title="Treatments" 
                    value="2 Active" 
                    icon={FileText} 
                    color="bg-blue-500"
                />
                <StatCard 
                    title="Messages" 
                    value="2 Unread" 
                    icon={MessageCircle} 
                    color="bg-purple-500"
                />
                <StatCard 
                    title="Health Score" 
                    value="85%" 
                    icon={TrendingUp} 
                    color="bg-green-500"
                    trend="+5% this month"
                />
            </div>

            {/* Next Appointment Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Next Appointment</h2>
                    <Link 
                        to="/patient/schedule" 
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                        View All
                    </Link>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">{upcomingAppointment.service}</h3>
                            <p className="text-gray-600 mt-1">with {upcomingAppointment.dentist}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Calendar size={16} className="mr-2" />
                                {upcomingAppointment.date}
                                <Clock size={16} className="ml-4 mr-2" />
                                {upcomingAppointment.time}
                                <span className="ml-4">({upcomingAppointment.duration})</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                Confirm
                            </button>
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
                                Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Treatment Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Treatment Progress</h2>
                <div className="space-y-4">
                    {treatmentProgress.map((treatment, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-gray-900">{treatment.treatment}</h3>
                                <span className="text-sm text-gray-500">{treatment.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div 
                                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${treatment.progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Next: {treatment.nextStep}</span>
                                <span>{treatment.estimatedCompletion}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <Link 
                        to="/patient/appointments" 
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                        View History
                    </Link>
                </div>
                <div className="space-y-3">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                            <div className={`p-2 rounded-lg ${
                                activity.status === 'completed' ? 'bg-green-100' :
                                activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                                {activity.status === 'completed' ? (
                                    <CheckCircle size={16} className="text-green-600" />
                                ) : activity.status === 'info' ? (
                                    <AlertCircle size={16} className="text-blue-600" />
                                ) : (
                                    <Clock size={16} className="text-gray-600" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                    to="/patient/schedule"
                    className="bg-teal-600 text-white p-6 rounded-xl hover:bg-teal-700 transition-colors text-center"
                >
                    <Calendar size={32} className="mx-auto mb-2" />
                    <h3 className="font-semibold">Book Appointment</h3>
                    <p className="text-sm mt-1 opacity-90">Schedule your next visit</p>
                </Link>
                <Link 
                    to="/patient/appointments"
                    className="bg-white border-2 border-gray-200 text-gray-700 p-6 rounded-xl hover:border-teal-300 hover:text-teal-600 transition-colors text-center"
                >
                    <Clock size={32} className="mx-auto mb-2" />
                    <h3 className="font-semibold">View Appointments</h3>
                    <p className="text-sm mt-1">Check your schedule</p>
                </Link>
                <Link 
                    to="/patient/profile"
                    className="bg-white border-2 border-gray-200 text-gray-700 p-6 rounded-xl hover:border-teal-300 hover:text-teal-600 transition-colors text-center"
                >
                    <FileText size={32} className="mx-auto mb-2" />
                    <h3 className="font-semibold">Update Profile</h3>
                    <p className="text-sm mt-1">Manage your information</p>
                </Link>
            </div>
        </div>
    );
};

export default PatientDashboard;
