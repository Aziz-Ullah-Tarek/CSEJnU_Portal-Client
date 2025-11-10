import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* User Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/100'}
                            alt={user?.displayName || 'User'}
                            className="w-24 h-24 rounded-full border-4 border-purple-200 object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100';
                            }}
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome, {user?.displayName || 'User'}!
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <div className="mt-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                    user?.emailVerified 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {user?.emailVerified ? '✓ Email Verified' : '⚠ Email Not Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                                <p className="text-3xl font-bold text-purple-600">0</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Active Bookings</p>
                                <p className="text-3xl font-bold text-green-600">0</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Past Bookings</p>
                                <p className="text-3xl font-bold text-indigo-600">0</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-gray-500 text-lg">No recent activity</p>
                        <p className="text-gray-400 text-sm mt-2">Your booking history will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
