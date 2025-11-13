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
            const response = await fetch('https://cse-portal-server.vercel.app/api/notices');
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
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl">
                        <FaBell className="text-white text-4xl" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Notice Board
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest announcements and events
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-md ${
                                filter === cat
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300'
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Notices Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading notices...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNotices.map((notice) => (
                            <div
                                key={notice._id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                            >
                                {/* Notice Image */}
                                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                                    <img
                                        src={notice.img}
                                        alt={notice.topic}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Important Badge */}
                                    {notice.important && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                                            <FaExclamationCircle size={14} />
                                            IMPORTANT
                                        </div>
                                    )}
                                    
                                    {/* Category Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold text-green-700 shadow-lg flex items-center gap-2">
                                        <FaTag size={12} />
                                        {notice.category}
                                    </div>
                                </div>

                                {/* Notice Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                                        {notice.topic}
                                    </h3>
                                    
                                    {/* Author */}
                                    {notice.author && (
                                        <p className="text-sm text-green-600 font-semibold mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                            {notice.author}
                                        </p>
                                    )}
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                                        {notice.description}
                                    </p>
                                    
                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                                            <FaCalendarAlt size={14} />
                                            {new Date(notice.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/notice/${notice._id}`)}
                                            className="text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-5 py-2 rounded-lg font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                                        >
                                            View Details
                                            <FaArrowRight size={11} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredNotices.length === 0 && !loading && (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                        <div className="text-7xl mb-6">📢</div>
                        <p className="text-gray-600 text-xl font-semibold">No notices found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;
