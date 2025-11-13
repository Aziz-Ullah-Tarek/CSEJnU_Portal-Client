import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        type: '',
        description: '',
        organizer: '',
        capacity: '',
        registrationDeadline: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    capacity: parseInt(formData.capacity),
                    createdAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                toast.success('Event added successfully!');
                setFormData({
                    title: '',
                    date: '',
                    time: '',
                    location: '',
                    type: '',
                    description: '',
                    organizer: '',
                    capacity: '',
                    registrationDeadline: ''
                });
                setShowForm(false);
                fetchEvents();
            } else {
                toast.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error('Error adding event');
        }
    };

    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
    const pastEvents = events.filter(event => new Date(event.date) < new Date());

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">Events</h1>
                    <p className="text-xl text-center mt-4">Stay updated with our latest activities and programs</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Add Event Button */}
                <div className="mb-8 flex justify-end">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {showForm ? 'Cancel' : 'Add New Event'}
                    </button>
                </div>

                {/* Event Registration Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-purple-600">Add New Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="e.g., Tech Fest 2025"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Type *
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Competition">Competition</option>
                                        <option value="Festival">Festival</option>
                                        <option value="Training">Training</option>
                                        <option value="Conference">Conference</option>
                                        <option value="Field Trip">Field Trip</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="e.g., Room 601, Auditorium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Organizer *
                                    </label>
                                    <input
                                        type="text"
                                        name="organizer"
                                        value={formData.organizer}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="e.g., CSE Department"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="Maximum participants"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Registration Deadline *
                                    </label>
                                    <input
                                        type="date"
                                        name="registrationDeadline"
                                        value={formData.registrationDeadline}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Event Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Describe your event in detail..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Upcoming Events */}
                <h2 className="text-4xl font-bold mb-8 text-purple-600">Upcoming Events</h2>
                {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No upcoming events</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                        {upcomingEvents.map((event) => (
                            <div key={event._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 border-l-4 border-purple-600 hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                        {event.type}
                                    </span>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(event.date).toLocaleDateString()} at {event.time}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {event.location}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Capacity: {event.capacity}
                                    </p>
                                </div>
                                <p className="text-gray-700 mb-4">{event.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <span className="text-sm text-gray-500">Organized by {event.organizer}</span>
                                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-semibold">
                                        Register
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Past Events */}
                <h2 className="text-4xl font-bold mb-8 text-gray-700">Past Events</h2>
                {pastEvents.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No past events</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastEvents.map((event) => (
                            <div key={event._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                    {event.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
