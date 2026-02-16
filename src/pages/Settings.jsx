import React, { useState } from 'react';
import { Save, Bell, Clock, DollarSign, FileText, Shield, Palette, Globe, Users, Calendar } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        clinicName: 'Perfect Smile Dental Clinic',
        email: 'contact@perfectsmile.com',
        phone: '(555) 123-4567',
        address: '123 Healthcare Ave, Medical District, City, State 12345',
        workingHours: {
            monday: { open: '09:00', close: '17:00', closed: false },
            tuesday: { open: '09:00', close: '17:00', closed: false },
            wednesday: { open: '09:00', close: '17:00', closed: false },
            thursday: { open: '09:00', close: '17:00', closed: false },
            friday: { open: '09:00', close: '17:00', closed: false },
            saturday: { open: '09:00', close: '14:00', closed: false },
            sunday: { open: '', close: '', closed: true }
        },
        appointmentDuration: '30',
        breakTime: '15',
        currency: 'USD',
        timezone: 'America/New_York',
        language: 'en',
        emailNotifications: true,
        smsNotifications: true,
        appointmentReminders: true,
        autoBackup: true,
        theme: 'light'
    });

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'clinic', label: 'Clinic Info', icon: Users },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: DollarSign },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette }
    ];

    const handleSave = () => {
        console.log('Settings saved:', settings);
        // Add save functionality here
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language
                                    </label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Timezone
                                    </label>
                                    <select
                                        value={settings.timezone}
                                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="America/New_York">Eastern Time</option>
                                        <option value="America/Chicago">Central Time</option>
                                        <option value="America/Denver">Mountain Time</option>
                                        <option value="America/Los_Angeles">Pacific Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'clinic':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Clinic Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Clinic Name
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.clinicName}
                                        onChange={(e) => setSettings({...settings, clinicName: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.email}
                                            onChange={(e) => setSettings({...settings, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={settings.phone}
                                            onChange={(e) => setSettings({...settings, phone: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={settings.address}
                                        onChange={(e) => setSettings({...settings, address: e.target.value})}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'appointments':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Settings</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default Appointment Duration (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.appointmentDuration}
                                            onChange={(e) => setSettings({...settings, appointmentDuration: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Break Time Between Appointments (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.breakTime}
                                            onChange={(e) => setSettings({...settings, breakTime: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Working Hours</h4>
                                    <div className="space-y-2">
                                        {Object.entries(settings.workingHours).map(([day, hours]) => (
                                            <div key={day} className="flex items-center gap-4">
                                                <div className="w-24 capitalize">{day}</div>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={!hours.closed}
                                                        onChange={(e) => {
                                                            const newWorkingHours = {...settings.workingHours};
                                                            newWorkingHours[day] = {...hours, closed: !e.target.checked};
                                                            setSettings({...settings, workingHours: newWorkingHours});
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    Open
                                                </label>
                                                {!hours.closed && (
                                                    <>
                                                        <input
                                                            type="time"
                                                            value={hours.open}
                                                            onChange={(e) => {
                                                                const newWorkingHours = {...settings.workingHours};
                                                                newWorkingHours[day] = {...hours, open: e.target.value};
                                                                setSettings({...settings, workingHours: newWorkingHours});
                                                            }}
                                                            className="px-2 py-1 border border-gray-300 rounded"
                                                        />
                                                        <span>to</span>
                                                        <input
                                                            type="time"
                                                            value={hours.close}
                                                            onChange={(e) => {
                                                                const newWorkingHours = {...settings.workingHours};
                                                                newWorkingHours[day] = {...hours, close: e.target.value};
                                                                setSettings({...settings, workingHours: newWorkingHours});
                                                            }}
                                                            className="px-2 py-1 border border-gray-300 rounded"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Email Notifications</div>
                                        <div className="text-sm text-gray-500">Receive email updates about appointments and patients</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">SMS Notifications</div>
                                        <div className="text-sm text-gray-500">Send text message reminders to patients</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.smsNotifications}
                                        onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Appointment Reminders</div>
                                        <div className="text-sm text-gray-500">Automatically send reminders before appointments</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.appointmentReminders}
                                        onChange={(e) => setSettings({...settings, appointmentReminders: e.target.checked})}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Currency
                                    </label>
                                    <select
                                        value={settings.currency}
                                        onChange={(e) => setSettings({...settings, currency: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                        <option value="CAD">CAD - Canadian Dollar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Auto Backup</div>
                                        <div className="text-sm text-gray-500">Automatically backup patient data daily</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.autoBackup}
                                        onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Theme
                                    </label>
                                    <select
                                        value={settings.theme}
                                        onChange={(e) => setSettings({...settings, theme: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your dental clinic settings</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                    <Save size={20} className="mr-2" />
                    Save Changes
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon size={18} className="mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;
