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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/notices')}
                    className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold mb-6 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                    <FaArrowLeft />
                    Back to All Notices
                </button>

                {/* Notice Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Notice Header Image */}
                    <div className="relative h-[450px]">
                        <img
                            src={notice.img}
                            alt={notice.topic}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Important Badge */}
                        {notice.important && (
                            <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl animate-pulse">
                                <FaExclamationCircle size={22} />
                                <span className="uppercase tracking-wide">Important Notice</span>
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-8 left-8 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl">
                            <FaTag size={18} />
                            {notice.category}
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-2xl">
                                {notice.topic}
                            </h1>
                            <div className="flex flex-wrap items-center gap-5 text-sm">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full font-semibold">
                                    <FaCalendarAlt size={16} />
                                    {new Date(notice.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                {notice.author && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full font-semibold">
                                        <FaUser size={16} />
                                        {notice.author}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notice Content */}
                    <div className="p-10 md:p-14">
                        {/* Meta Information Bar */}
                        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b-2 border-gray-200">
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                                <FaTag size={14} />
                                {notice.category}
                            </span>
                            <span className="text-gray-600 text-sm flex items-center gap-2 font-semibold bg-gray-100 px-5 py-2.5 rounded-full">
                                <FaCalendarAlt size={14} />
                                Published on {new Date(notice.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        {/* Author Card */}
                        {notice.author && (
                            <div className="mb-10 p-8 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl border-l-4 border-green-600 shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                                        <FaUser size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-1">Posted By</p>
                                        <p className="text-xl font-bold text-gray-900">{notice.author}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="prose prose-lg max-w-none">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-gray-900 m-0">Notice Details</h2>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line m-0">
                                    {notice.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-12 pt-10 border-t-2 border-gray-200 flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/notices')}
                                className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                            >
                                <FaArrowLeft size={18} />
                                Back to All Notices
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-8 py-4 border-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
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
