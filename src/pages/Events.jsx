import React from 'react';

const Events = () => {
    const upcomingEvents = [
        { id: 1, title: 'Tech Fest 2025', date: 'December 15, 2025', type: 'Festival', description: 'Annual technology festival with coding competitions, project showcase, and tech talks' },
        { id: 2, title: 'AI Workshop', date: 'November 20, 2025', type: 'Workshop', description: 'Hands-on workshop on Artificial Intelligence and Machine Learning' },
        { id: 3, title: 'Hackathon', date: 'November 30, 2025', type: 'Competition', description: '24-hour coding marathon to solve real-world problems' },
    ];

    const pastEvents = [
        { id: 1, title: 'Web Development Bootcamp', date: 'October 10, 2025', type: 'Training' },
        { id: 2, title: 'Industry Visit - Tech Company', date: 'September 25, 2025', type: 'Field Trip' },
        { id: 3, title: 'Programming Contest', date: 'August 15, 2025', type: 'Competition' },
        { id: 4, title: 'Seminar on Cyber Security', date: 'July 20, 2025', type: 'Seminar' },
    ];

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">Events</h1>
                    <p className="text-xl text-center mt-4">Stay updated with our latest activities and programs</p>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold mb-8 text-purple-600">Upcoming Events</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-purple-600">
                            <div className="card-body">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="card-title text-2xl">{event.title}</h3>
                                    <div className="badge badge-primary">{event.type}</div>
                                </div>
                                <p className="flex items-center gap-2 text-gray-600 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {event.date}
                                </p>
                                <p className="text-gray-700">{event.description}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary btn-sm">Register Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Past Events */}
                <h2 className="text-4xl font-bold mb-8 text-gray-700">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pastEvents.map((event) => (
                        <div key={event.id} className="card bg-gray-50 shadow hover:shadow-lg transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-lg">{event.title}</h3>
                                <p className="text-sm text-gray-600">{event.date}</p>
                                <div className="badge badge-outline badge-sm">{event.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
