import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';

const ScheduleInquiry = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        reason: '',
        notes: '',
        firstVisit: false,
        insurance: '',
        emergency: false
    });

    const services = [
        { id: 1, name: 'Regular Check-up', duration: '45 min', description: 'Comprehensive dental examination' },
        { id: 2, name: 'Teeth Cleaning', duration: '30 min', description: 'Professional cleaning and polishing' },
        { id: 3, name: 'Fillings', duration: '60 min', description: 'Cavity treatment and restoration' },
        { id: 4, name: 'Root Canal', duration: '90 min', description: 'Endodontic treatment' },
        { id: 5, name: 'Extraction', duration: '45 min', description: 'Tooth removal procedure' },
        { id: 6, name: 'Orthodontic Consultation', duration: '60 min', description: 'Braces and alignment assessment' },
        { id: 7, name: 'Teeth Whitening', duration: '90 min', description: 'Cosmetic whitening treatment' },
        { id: 8, name: 'Emergency', duration: '30 min', description: 'Urgent dental care' }
    ];

    const timeSlots = [
        '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
    ];

    const dentists = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Dentistry', rating: 4.8 },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Orthodontics', rating: 4.9 },
        { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Cosmetic Dentistry', rating: 4.7 }
    ];

    const [selectedDentist, setSelectedDentist] = useState(dentists[0]);

    // Generate calendar days
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const isDateAvailable = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today && date.getDay() !== 0; // Not Sunday
    };

    const handleNextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // Handle appointment booking
        console.log('Appointment booked:', {
            service: selectedService,
            date: selectedDate,
            time: selectedTime,
            dentist: selectedDentist,
            formData
        });
        alert('Appointment booked successfully!');
    };

    const renderStep1 = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => setSelectedService(service.name)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedService === service.name
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">{service.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <Clock size={16} className="mr-1" />
                                    {service.duration}
                                </div>
                            </div>
                            {selectedService === service.name && (
                                <Check className="text-teal-600" size={20} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date</h2>
            
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-medium">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white border rounded-lg p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentMonth).map((day, index) => (
                        <div
                            key={index}
                            onClick={() => isDateAvailable(day) && setSelectedDate(day)}
                            className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                                !day
                                    ? ''
                                    : !isDateAvailable(day)
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : selectedDate === day
                                    ? 'bg-teal-500 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Time</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                    <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border transition-colors ${
                            selectedTime === time
                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            {/* Dentist Selection */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Preferred Dentist</h3>
                <div className="space-y-3">
                    {dentists.map((dentist) => (
                        <div
                            key={dentist.id}
                            onClick={() => setSelectedDentist(dentist)}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                selectedDentist.id === dentist.id
                                    ? 'border-teal-500 bg-teal-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900">{dentist.name}</h4>
                                    <p className="text-sm text-gray-600">{dentist.specialty}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="text-sm text-gray-600">{dentist.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Visit
                    </label>
                    <select
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        <option value="">Select a reason</option>
                        <option value="routine">Routine Check-up</option>
                        <option value="pain">Pain/Discomfort</option>
                        <option value="cosmetic">Cosmetic Concern</option>
                        <option value="emergency">Emergency</option>
                        <option value="followup">Follow-up Visit</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Please describe any symptoms or concerns..."
                    />
                </div>

                <div className="space-y-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.firstVisit}
                            onChange={(e) => setFormData({...formData, firstVisit: e.target.checked})}
                            className="mr-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">This is my first visit</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.emergency}
                            onChange={(e) => setFormData({...formData, emergency: e.target.checked})}
                            className="mr-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">This is an emergency appointment</span>
                    </label>
                </div>

                {/* Appointment Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">Appointment Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service:</span>
                            <span className="font-medium">{selectedService}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">
                                {selectedDate && currentMonth.toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: numeric, 
                                    year: numeric 
                                }).replace(/\d+/, selectedDate)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Dentist:</span>
                            <span className="font-medium">{selectedDentist.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>
                <p className="text-gray-600">Book your dental appointment in a few simple steps</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step >= stepNumber ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {stepNumber}
                        </div>
                        {stepNumber < 4 && (
                            <div className={`w-full h-1 mx-2 ${
                                step > stepNumber ? 'bg-teal-500' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handlePrevStep}
                    disabled={step === 1}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                        step === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={step === 4 ? handleSubmit : handleNextStep}
                    disabled={(step === 1 && !selectedService) || 
                             (step === 2 && !selectedDate) || 
                             (step === 3 && !selectedTime)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                        (step === 1 && !selectedService) || 
                        (step === 2 && !selectedDate) || 
                        (step === 3 && !selectedTime)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                >
                    {step === 4 ? 'Book Appointment' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default ScheduleInquiry;
