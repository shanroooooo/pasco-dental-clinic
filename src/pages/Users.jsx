import React, { useState } from 'react';
import { Search, Plus, Filter, Calendar, Phone, Mail, MapPin, User, Clock, TrendingUp } from 'lucide-react';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const patients = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '(555) 123-4567',
            address: '123 Main St, City, State 12345',
            lastVisit: '2024-02-15',
            nextAppointment: '2024-03-01',
            status: 'active',
            treatments: ['Cleaning', 'Filling']
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'm.chen@email.com',
            phone: '(555) 987-6543',
            address: '456 Oak Ave, City, State 12345',
            lastVisit: '2024-02-10',
            nextAppointment: '2024-02-28',
            status: 'active',
            treatments: ['Root Canal', 'Crown']
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.r@email.com',
            phone: '(555) 456-7890',
            address: '789 Pine Rd, City, State 12345',
            lastVisit: '2024-01-20',
            nextAppointment: '',
            status: 'inactive',
            treatments: ['Orthodontics']
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'd.kim@email.com',
            phone: '(555) 234-5678',
            address: '321 Elm St, City, State 12345',
            lastVisit: '2024-02-12',
            nextAppointment: '2024-02-25',
            status: 'active',
            treatments: ['Extraction', 'Implant']
        }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        return status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                    <p className="text-gray-600 mt-1">Manage your dental clinic patients</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Patient
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Patients</p>
                            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                        </div>
                        <User className="text-indigo-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Active Patients</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {patients.filter(p => p.status === 'active').length}
                            </p>
                        </div>
                        <Clock className="text-green-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Appointments Today</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                        <Calendar className="text-blue-600" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">New This Month</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                        <TrendingUp className="text-purple-600" size={24} />
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search patients by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="all">All Patients</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Visit
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Next Appointment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {patient.address}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center">
                                            <Mail size={14} className="mr-1" />
                                            {patient.email}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center mt-1">
                                            <Phone size={14} className="mr-1" />
                                            {patient.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {patient.lastVisit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {patient.nextAppointment || 'No appointment'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            View
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
