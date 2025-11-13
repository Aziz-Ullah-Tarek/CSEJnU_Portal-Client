import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaExclamationCircle, FaArrowLeft, FaUser } from 'react-icons/fa';

const NoticeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotice();
    }, [id]);

    const fetchNotice = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notices/${id}`);
            const data = await response.json();
            setNotice(data);
        } catch (error) {
            console.error('Failed to fetch notice');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Notice Not Found</h2>
                    <button
                        onClick={() => navigate('/notices')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Back to Notices
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/notices')}
                    className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold mb-8 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                    <FaArrowLeft />
                    <span>Back to All Notices</span>
                </button>

                {/* Notice Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Notice Header Image */}
                    <div className="relative h-[400px]">
                        <img
                            src={notice.img}
                            alt={notice.topic}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-6 left-0 right-0 px-8 flex items-center justify-between">
                            {/* Category Badge */}
                            <div className="bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg text-green-700">
                                <FaTag size={16} />
                                {notice.category}
                            </div>

                            {/* Important Badge */}
                            {notice.important && (
                                <div className="bg-red-500 text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                                    <FaExclamationCircle size={18} />
                                    <span className="uppercase tracking-wide">Important</span>
                                </div>
                            )}
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-2xl">
                                {notice.topic}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-semibold text-white text-sm">
                                    <FaCalendarAlt size={14} />
                                    {new Date(notice.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                {notice.author && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-semibold text-white text-sm">
                                        <FaUser size={14} />
                                        {notice.author}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notice Content */}
                    <div className="p-10 md:p-12">
                        {/* Author Card */}
                        {notice.author && (
                            <div className="mb-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-l-4 border-green-600">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                                        <FaUser size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-0.5">Posted By</p>
                                        <p className="text-lg font-bold text-gray-900">{notice.author}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900">Notice Details</h2>
                            </div>
                            
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                                    {notice.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/notices')}
                                className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                            >
                                <FaArrowLeft size={16} />
                                Back to Notices
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                            >
                                🖨️ Print Notice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetails;
