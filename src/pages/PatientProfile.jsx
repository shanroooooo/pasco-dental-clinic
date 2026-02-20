import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, FileText, Shield, CreditCard, AlertCircle, Edit, Save, X, Upload, Download, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const PatientProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patientData, setPatientData] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [dentists, setDentists] = useState([]);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        relationship: '',
        insuranceProvider: '',
        insuranceId: '',
        groupNumber: '',
        allergies: '',
        medications: '',
        medicalConditions: '',
        preferredDentist: '',
        preferredTime: 'Morning',
        reminderPreference: 'Email'
    });

    useEffect(() => {
        loadPatientData();
        loadDentists();
    }, []);

    const loadPatientData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Load patient profile
            const patientResponse = await apiService.getPatientProfile();
            setPatientData(patientResponse);
            
            // Load medical history (appointments)
            const appointmentsResponse = await apiService.getAppointments({ status: 'Completed' });
            setMedicalHistory(appointmentsResponse.appointments || []);
            
            // Load documents
            const documentsResponse = await apiService.getPatientDocuments(patientResponse._id);
            setDocuments(documentsResponse.documents || []);
            
            // Update form data with patient data
            if (patientResponse && patientResponse.userId) {
                setFormData({
                    firstName: patientResponse.userId.firstName || '',
                    lastName: patientResponse.userId.lastName || '',
                    email: patientResponse.userId.email || '',
                    phone: patientResponse.userId.phone || '',
                    dateOfBirth: patientResponse.userId.dateOfBirth ? new Date(patientResponse.userId.dateOfBirth).toISOString().split('T')[0] : '',
                    address: patientResponse.userId.address ? `${patientResponse.userId.address.street || ''}, ${patientResponse.userId.address.city || ''}, ${patientResponse.userId.address.state || ''} ${patientResponse.userId.address.zipCode || ''}` : '',
                    emergencyContact: patientResponse.userId.emergencyContact?.name || '',
                    emergencyPhone: patientResponse.userId.emergencyContact?.phone || '',
                    relationship: patientResponse.userId.emergencyContact?.relationship || '',
                    insuranceProvider: patientResponse.medicalInfo?.insuranceProvider || '',
                    insuranceId: patientResponse.medicalInfo?.insuranceId || '',
                    groupNumber: patientResponse.medicalInfo?.groupNumber || '',
                    allergies: patientResponse.medicalInfo?.allergies?.join(', ') || '',
                    medications: patientResponse.medicalInfo?.medications?.map(med => `${med.name} ${med.dosage} ${med.frequency}`).join(', ') || '',
                    medicalConditions: patientResponse.medicalInfo?.medicalConditions?.map(cond => cond.condition).join(', ') || '',
                    preferredDentist: patientResponse.preferences?.preferredDentist?._id || '',
                    preferredTime: patientResponse.preferences?.preferredTime || 'Morning',
                    reminderPreference: patientResponse.preferences?.reminderPreference?.join(', ') || 'Email'
                });
            }
        } catch (error) {
            console.error('Error loading patient data:', error);
            setError('Failed to load patient data');
        } finally {
            setLoading(false);
        }
    };

    const loadDentists = async () => {
        try {
            const response = await apiService.getDentists();
            setDentists(response);
        } catch (error) {
            console.error('Error loading dentists:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setError(null);
            
            // Prepare user profile update data
            const userProfileData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                address: formData.address,
                emergencyContact: {
                    name: formData.emergencyContact,
                    phone: formData.emergencyPhone,
                    relationship: formData.relationship
                }
            };

            // Update user profile
            await apiService.updateProfile(userProfileData);

            // Prepare patient profile update data
            const patientProfileData = {
                medicalInfo: {
                    insuranceProvider: formData.insuranceProvider,
                    insuranceId: formData.insuranceId,
                    groupNumber: formData.groupNumber,
                    allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
                    medications: formData.medications.split(',').map(m => {
                        const parts = m.trim().split(' ');
                        return {
                            name: parts[0] || '',
                            dosage: parts[1] || '',
                            frequency: parts.slice(2).join(' ') || ''
                        };
                    }).filter(med => med.name),
                    medicalConditions: formData.medicalConditions.split(',').map(c => ({ condition: c.trim(), status: 'active' })).filter(c => c.condition)
                },
                preferences: {
                    preferredDentist: formData.preferredDentist,
                    preferredTime: formData.preferredTime,
                    reminderPreference: formData.reminderPreference.split(',').map(r => r.trim()).filter(r => r)
                }
            };

            // Update patient profile
            await apiService.updatePatient(patientData._id, patientProfileData);

            setIsEditing(false);
            await loadPatientData(); // Reload data to get updates
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            setError('Failed to update profile');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        loadPatientData(); // Reload original data
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-6xl mx-auto flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="animate-spin mx-auto mb-4" size={40} />
                    <p className="text-gray-600">Loading patient profile...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-6xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertCircle className="text-red-500 mr-3" size={24} />
                    <div>
                        <h3 className="text-red-800 font-medium">Error</h3>
                        <p className="text-red-600">{error}</p>
                        <button 
                            onClick={loadPatientData}
                            className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                            <option value="">Select a dentist</option>
                            {dentists.map(dentist => (
                                <option key={dentist._id} value={dentist._id}>
                                    Dr. {dentist.firstName} {dentist.lastName}
                                </option>
                            ))}
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
                            {medicalHistory.length > 0 ? (
                                medicalHistory.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(record.dateTime).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{record.serviceType}</div>
                                                <div className="text-sm text-gray-500">{record.notes}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.dentistId ? `Dr. ${record.dentistId.firstName} ${record.dentistId.lastName}` : 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${record.cost}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                record.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {record.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-teal-600 hover:text-teal-900">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No treatment history available
                                    </td>
                                </tr>
                            )}
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
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc._id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <FileText className="text-gray-600" size={24} />
                                </div>
                                <button 
                                    onClick={() => apiService.downloadDocument(doc._id)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1">{doc.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{doc.type}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                <span>{(doc.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No documents available
                    </div>
                )}
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
