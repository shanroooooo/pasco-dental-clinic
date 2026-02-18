import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, FileText, Shield, CreditCard, AlertCircle, Edit, Save, X, Upload, Download } from 'lucide-react';

const PatientProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        dateOfBirth: '1985-06-15',
        address: '123 Main St, City, State 12345',
        emergencyContact: 'John Johnson',
        emergencyPhone: '(555) 987-6543',
        relationship: 'Spouse',
        insuranceProvider: 'Delta Dental',
        insuranceId: 'DD123456789',
        groupNumber: 'GRP-001',
        allergies: 'Penicillin',
        medications: 'Lisinopril 10mg daily',
        medicalConditions: 'Hypertension',
        preferredDentist: 'Dr. Sarah Johnson',
        preferredTime: 'Morning',
        reminderPreference: 'Email and SMS'
    });

    const medicalHistory = [
        {
            date: '2024-02-15',
            procedure: 'Teeth Cleaning',
            dentist: 'Dr. Sarah Johnson',
            notes: 'Routine cleaning completed successfully',
            cost: '$120',
            paid: true
        },
        {
            date: '2024-02-10',
            procedure: 'Filling Procedure',
            dentist: 'Dr. Michael Chen',
            notes: 'Cavity filled on tooth #19',
            cost: '$250',
            paid: true
        },
        {
            date: '2024-01-20',
            procedure: 'Emergency Consultation',
            dentist: 'Dr. Emily Rodriguez',
            notes: 'Tooth pain evaluation - root canal recommended',
            cost: '$100',
            paid: true
        },
        {
            date: '2023-12-15',
            procedure: 'Annual Check-up',
            dentist: 'Dr. Sarah Johnson',
            notes: 'General examination, all clear',
            cost: '$150',
            paid: true
        }
    ];

    const documents = [
        {
            id: 1,
            name: 'X-Ray - 2024-02-15',
            type: 'Medical Imaging',
            date: '2024-02-15',
            size: '2.4 MB'
        },
        {
            id: 2,
            name: 'Treatment Plan',
            type: 'Document',
            date: '2024-02-10',
            size: '156 KB'
        },
        {
            id: 3,
            name: 'Insurance Card',
            type: 'ID Document',
            date: '2024-01-15',
            size: '890 KB'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Save profile logic here
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        // Reset form data to original values
        setIsEditing(false);
    };

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        <Edit size={20} className="mr-2" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Save size={20} className="mr-2" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <X size={20} className="mr-2" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Relationship
                        </label>
                        <input
                            type="text"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMedicalInfo = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Medical Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Provider
                    </label>
                    <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance ID
                    </label>
                    <input
                        type="text"
                        name="insuranceId"
                        value={formData.insuranceId}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Number
                    </label>
                    <input
                        type="text"
                        name="groupNumber"
                        value={formData.groupNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allergies
                    </label>
                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Medications
                    </label>
                    <textarea
                        name="medications"
                        value={formData.medications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medical Conditions
                    </label>
                    <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                    />
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Dentist
                        </label>
                        <select
                            name="preferredDentist"
                            value={formData.preferredDentist}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                            <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                            <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Time
                        </label>
                        <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHistory = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Treatment History</h2>
            
            <div className="bg-white border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Procedure
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dentist
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cost
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
                            {medicalHistory.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{record.procedure}</div>
                                            <div className="text-sm text-gray-500">{record.notes}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.dentist}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.cost}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            record.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {record.paid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-teal-600 hover:text-teal-900">
                                            View Details
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

    const renderDocuments = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
                <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    <Upload size={20} className="mr-2" />
                    Upload Document
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <FileText className="text-gray-600" size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Download size={20} />
                            </button>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{doc.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{doc.type}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{doc.date}</span>
                            <span>{doc.size}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your personal information and medical records</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    {[
                        { id: 'personal', label: 'Personal Info', icon: User },
                        { id: 'medical', label: 'Medical Info', icon: Shield },
                        { id: 'history', label: 'History', icon: Calendar },
                        { id: 'documents', label: 'Documents', icon: FileText }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-teal-500 text-teal-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Icon size={16} className="mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                {activeTab === 'personal' && renderPersonalInfo()}
                {activeTab === 'medical' && renderMedicalInfo()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'documents' && renderDocuments()}
            </div>
        </div>
    );
};

export default PatientProfile;
