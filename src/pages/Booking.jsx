import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const Booking = () => {
    const [formData, setFormData] = useState({
        facility: '',
        date: '',
        time: '',
        duration: '1',
        purpose: ''
    });

    const facilities = [
        { id: 'classroom', name: 'Classroom 401', capacity: 60, icon: '🏫' },
        { id: 'lab', name: 'Computer Lab', capacity: 40, icon: '💻' },
        { id: 'seminar', name: 'Seminar Hall', capacity: 150, icon: '🎭' },
        { id: 'auditorium', name: 'Auditorium', capacity: 300, icon: '🎪' }
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Booking request submitted successfully!');
        setFormData({ facility: '', date: '', time: '', duration: '1', purpose: '' });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Facility Booking
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Reserve classrooms, labs, and halls for your events
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FaCalendarAlt className="text-green-600" />
                                Book a Facility
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Facility Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Facility
                                    </label>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {facilities.map((facility) => (
                                            <label
                                                key={facility.id}
                                                className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                                    formData.facility === facility.id
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-gray-200 hover:border-green-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="facility"
                                                    value={facility.id}
                                                    checked={formData.facility === facility.id}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <span className="text-3xl">{facility.icon}</span>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{facility.name}</div>
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <FaUsers size={12} />
                                                        {facility.capacity} seats
                                                    </div>
                                                </div>
                                                {formData.facility === facility.id && (
                                                    <FaCheckCircle className="text-green-600 absolute top-3 right-3" />
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Date and Time */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time Slot
                                        </label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select time</option>
                                            {timeSlots.map((slot) => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (hours)
                                    </label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        min="1"
                                        max="8"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Purpose */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Purpose of Booking
                                    </label>
                                    <textarea
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe the purpose of your booking..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Submit Booking Request
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Booking Guidelines */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Guidelines Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                📋 Booking Guidelines
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>Book at least 24 hours in advance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>Maximum 8 hours per booking</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>Approval required for auditorium</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>Cancel 6 hours before start time</span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">📊 Your Bookings</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-green-100">Active</span>
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-100">Pending</span>
                                    <span className="text-2xl font-bold">1</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-100">Completed</span>
                                    <span className="text-2xl font-bold">12</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                💬 Need Help?
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Contact the facility management team
                            </p>
                            <a
                                href="mailto:facilities@jnu.ac.in"
                                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition"
                            >
                                facilities@jnu.ac.in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
