import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Filter, Search, ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

const Appointments = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const upcomingAppointments = [
        {
            id: 1,
            date: '2024-02-28',
            time: '10:30 AM',
            service: 'Regular Check-up',
            dentist: 'Dr. Sarah Johnson',
            duration: '45 minutes',
            status: 'confirmed',
            location: 'Main Clinic - Room 3',
            notes: 'Please arrive 10 minutes early for paperwork',
            preparation: 'Avoid eating 2 hours before appointment',
            cost: '$150'
        },
        {
            id: 2,
            date: '2024-03-15',
            time: '2:00 PM',
            service: 'Teeth Cleaning',
            dentist: 'Dr. Michael Chen',
            duration: '30 minutes',
            status: 'pending',
            location: 'Main Clinic - Room 1',
            notes: 'Follow-up from previous cleaning',
            preparation: 'Normal eating allowed',
            cost: '$120'
        },
        {
            id: 3,
            date: '2024-04-10',
            time: '9:00 AM',
            service: 'Orthodontic Adjustment',
            dentist: 'Dr. Emily Rodriguez',
            duration: '60 minutes',
            status: 'confirmed',
            location: 'Main Clinic - Room 2',
            notes: 'Monthly adjustment appointment',
            preparation: 'No special preparation needed',
            cost: '$200'
        }
    ];

    const pastAppointments = [
        {
            id: 4,
            date: '2024-02-15',
            time: '11:00 AM',
            service: 'Teeth Cleaning',
            dentist: 'Dr. Sarah Johnson',
            duration: '30 minutes',
            status: 'completed',
            location: 'Main Clinic - Room 1',
            notes: 'Routine cleaning completed',
            followUp: 'Next cleaning in 6 months',
            cost: '$120',
            paid: true
        },
        {
            id: 5,
            date: '2024-02-10',
            time: '3:30 PM',
            service: 'Filling Procedure',
            dentist: 'Dr. Michael Chen',
            duration: '60 minutes',
            status: 'completed',
            location: 'Main Clinic - Room 3',
            notes: 'Cavity filled on tooth #19',
            followUp: 'Check filling at next visit',
            cost: '$250',
            paid: true
        },
        {
            id: 6,
            date: '2024-01-20',
            time: '10:00 AM',
            service: 'Emergency Consultation',
            dentist: 'Dr. Emily Rodriguez',
            duration: '30 minutes',
            status: 'completed',
            location: 'Main Clinic - Room 2',
            notes: 'Tooth pain evaluation',
            followUp: 'Root canal scheduled',
            cost: '$100',
            paid: true
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'pending':
                return <AlertCircle size={16} className="text-yellow-600" />;
            case 'completed':
                return <CheckCircle size={16} className="text-blue-600" />;
            case 'cancelled':
                return <XCircle size={16} className="text-red-600" />;
            default:
                return <Clock size={16} className="text-gray-600" />;
        }
    };

    const filteredAppointments = (appointments) => {
        return appointments.filter(apt => {
            const matchesSearch = apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 apt.dentist.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    };

    const AppointmentCard = ({ appointment, isUpcoming }) => (
        <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.service}</h3>
                    <p className="text-gray-600 mt-1">with {appointment.dentist}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{appointment.status}</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        {appointment.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2" />
                        {appointment.time} ({appointment.duration})
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        {appointment.location}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="text-sm">
                        <span className="font-medium text-gray-700">Cost:</span>
                        <span className="ml-2 text-gray-900">{appointment.cost}</span>
                    </div>
                    {appointment.preparation && (
                        <div className="text-sm">
                            <span className="font-medium text-gray-700">Preparation:</span>
                            <p className="text-gray-600 mt-1">{appointment.preparation}</p>
                        </div>
                    )}
                </div>
            </div>

            {appointment.notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                </div>
            )}

            {isUpcoming ? (
                <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        Confirm
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Reschedule
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        {appointment.followUp && (
                            <p><span className="font-medium">Follow-up:</span> {appointment.followUp}</p>
                        )}
                        {appointment.paid !== undefined && (
                            <p className="mt-1">
                                <span className="font-medium">Payment:</span> 
                                <span className={appointment.paid ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                                    {appointment.paid ? 'Paid' : 'Unpaid'}
                                </span>
                            </p>
                        )}
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View Details
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                    <p className="text-gray-600 mt-1">Manage your dental appointments</p>
                </div>
                <Link
                    to="/patient/schedule"
                    className="mt-4 sm:mt-0 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                >
                    <Calendar size={20} className="mr-2" />
                    Book New Appointment
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Upcoming</p>
                            <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                        </div>
                        <Calendar className="text-teal-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Confirmed</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {upcomingAppointments.filter(a => a.status === 'confirmed').length}
                            </p>
                        </div>
                        <CheckCircle className="text-green-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Past Visits</p>
                            <p className="text-2xl font-bold text-gray-900">{pastAppointments.length}</p>
                        </div>
                        <Clock className="text-blue-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Next Visit</p>
                            <p className="text-lg font-bold text-gray-900">Feb 28</p>
                        </div>
                        <AlertCircle className="text-purple-600" size={24} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'upcoming'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Upcoming ({upcomingAppointments.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'past'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Past Visits ({pastAppointments.length})
                    </button>
                </nav>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {activeTab === 'upcoming' && (
                    <>
                        {filteredAppointments(upcomingAppointments).length > 0 ? (
                            filteredAppointments(upcomingAppointments).map((appointment) => (
                                <AppointmentCard 
                                    key={appointment.id} 
                                    appointment={appointment} 
                                    isUpcoming={true}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg">
                                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                                <p className="text-gray-600 mb-4">You don't have any appointments scheduled</p>
                                <Link
                                    to="/patient/schedule"
                                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    <Calendar size={20} className="mr-2" />
                                    Book Appointment
                                </Link>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'past' && (
                    <>
                        {filteredAppointments(pastAppointments).length > 0 ? (
                            filteredAppointments(pastAppointments).map((appointment) => (
                                <AppointmentCard 
                                    key={appointment.id} 
                                    appointment={appointment} 
                                    isUpcoming={false}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg">
                                <Clock className="mx-auto text-gray-400 mb-4" size={48} />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                                <p className="text-gray-600">Your appointment history will appear here</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Appointments;
