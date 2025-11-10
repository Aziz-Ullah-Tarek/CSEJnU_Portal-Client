import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaCalendarAlt, FaTag, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

const Notices = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notices');
            const data = await response.json();
            setNotices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setLoading(false);
        }
    };

    const filteredNotices = filter === 'all' 
        ? notices 
        : notices.filter(notice => notice.category === filter);

    const categories = ['all', 'Academic', 'Event', 'Placement', 'Workshop', 'Facility'];

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl mb-4 shadow-lg">
                        <FaBell className="text-white text-3xl" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Notice Board
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Stay updated with the latest announcements and events
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                filter === cat
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-green-50 border border-green-200'
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Notices Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading notices...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNotices.map((notice) => (
                            <div
                                key={notice._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                {/* Notice Image */}
                                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                                    <img
                                        src={notice.img}
                                        alt={notice.topic}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    
                                    {/* Important Badge */}
                                    {notice.important && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse flex items-center gap-1.5">
                                            <FaExclamationCircle size={12} />
                                            IMPORTANT
                                        </div>
                                    )}
                                    
                                    {/* Category Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 shadow-md flex items-center gap-1.5">
                                        <FaTag size={11} />
                                        {notice.category}
                                    </div>
                                </div>

                                {/* Notice Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                                        {notice.topic}
                                    </h3>
                                    
                                    {/* Author */}
                                    {notice.author && (
                                        <p className="text-xs text-green-600 font-medium mb-3 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                            {notice.author}
                                        </p>
                                    )}
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {notice.description}
                                    </p>
                                    
                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                            <FaCalendarAlt size={13} />
                                            {new Date(notice.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/notice/${notice._id}`)}
                                            className="text-green-600 hover:text-white bg-green-50 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center gap-2"
                                        >
                                            View Details
                                            <FaArrowRight size={10} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredNotices.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">No notices found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;
