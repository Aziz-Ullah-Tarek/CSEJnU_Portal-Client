import React, { useState, useEffect } from 'react';

const Faculty = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        fetch('/data/faculty.json')
            .then((response) => response.json())
            .then((data) => setFaculty(data.faculty))
            .catch((error) => console.error('Error loading faculty data:', error));
    }, []);

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">Our Faculty</h1>
                    <p className="text-xl text-center mt-4">Meet our dedicated team of educators and researchers</p>
                </div>
            </div>

            {/* Faculty Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {faculty.map((member) => (
                        <div key={member.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
                            <figure className="pt-8 px-8">
                                <div className="flex justify-center">
                                    {member.image ? (
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="rounded-full w-32 h-32 object-cover border-4 border-purple-600"
                                        />
                                    ) : (
                                        <div className="bg-purple-600 text-white rounded-full w-32 h-32 flex items-center justify-center">
                                            <span className="text-4xl">{member.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                            </figure>
                            <div className="p-6 text-center">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h2>
                                <p className="text-sm font-semibold text-purple-600 mb-2">{member.designation}</p>
                                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs mb-4">
                                    {member.specialization}
                                </div>
                                <div className="flex flex-col gap-2 text-sm text-gray-600">
                                    <a href={`mailto:${member.email}`} className="hover:text-purple-600 flex items-center gap-2 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {member.email}
                                    </a>
                                    {member.phone && (
                                        <a href={`tel:${member.phone}`} className="hover:text-purple-600 flex items-center gap-2 justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {member.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faculty;
