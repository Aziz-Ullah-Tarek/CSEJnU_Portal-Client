import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [dashboardData, setDashboardData] = useState({
        classroomBookings: [],
        labBookings: [],
        totalBookings: 0
    });
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            console.log('Fetching dashboard for email:', user.email);
            // Add timestamp to prevent caching
            const timestamp = new Date().getTime();
            const response = await fetch(`http://localhost:5000/api/user-dashboard/${user.email}?t=${timestamp}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Dashboard API Response:', data);
            console.log('Classroom bookings:', data.classroomBookings?.length || 0);
            console.log('Lab bookings:', data.labBookings?.length || 0);
            console.log('Total bookings:', data.totalBookings);
            
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchNotices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notices/latest');
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            console.log('Dashboard mounted/updated, fetching data...');
            console.log('Current location:', location.pathname);
            fetchDashboardData();
            fetchNotices();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email, location.pathname]); // Refetch when route changes

    const getStatusColor = (status) => {
        switch(status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    const allBookings = [
        ...dashboardData.classroomBookings,
        ...dashboardData.labBookings
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const approvedCount = allBookings.filter(b => b.status === 'approved').length;
    const pendingCount = allBookings.filter(b => b.status === 'pending').length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                
                {/* Page Header */}
                <div className="bg-white border-l-4 border-indigo-600 shadow-sm mb-8 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.displayName || 'Student'}!</p>
                        </div>
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/80'}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-indigo-200 object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/80';
                            }}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
                            <span className="text-2xl">📋</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{dashboardData.totalBookings}</p>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600">Classroom</h3>
                            <span className="text-2xl">🏫</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{dashboardData.classroomBookings.length}</p>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600">Lab</h3>
                            <span className="text-2xl">🔬</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{dashboardData.labBookings.length}</p>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600">Approved</h3>
                            <span className="text-2xl">✅</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 shadow-sm mb-8 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            to="/classroom"
                            className="flex items-center gap-4 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🏫</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Book Classroom</h3>
                                <p className="text-sm text-gray-600">Reserve a classroom for your session</p>
                            </div>
                        </Link>

                        <Link 
                            to="/lab"
                            className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🔬</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Book Lab</h3>
                                <p className="text-sm text-gray-600">Reserve a computer lab</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Booking History */}
                <div className="bg-white border border-gray-200 shadow-sm">
                    <div className="bg-indigo-600 text-white px-6 py-4">
                        <h2 className="text-xl font-semibold">My Booking History</h2>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading bookings...</p>
                            </div>
                        ) : allBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <span className="text-6xl mb-4 block">📝</span>
                                <p className="text-gray-500 text-lg mb-2">No bookings yet</p>
                                <p className="text-gray-400 text-sm">Book a classroom or lab to get started</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Room/Lab</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBookings.map((booking) => (
                                            <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                                        booking.type === 'classroom' 
                                                            ? 'bg-blue-100 text-blue-700' 
                                                            : 'bg-purple-100 text-purple-700'
                                                    }`}>
                                                        {booking.type === 'classroom' ? '🏫 Classroom' : '🔬 Lab'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-800">{booking.subject}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {booking.classroomId || booking.labId}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {booking.startTime} - {booking.endTime}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded ${getStatusColor(booking.status)}`}>
                                                        {booking.status.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Info Section */}
                {pendingCount > 0 && (
                    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-800">
                                    You have <strong>{pendingCount}</strong> booking{pendingCount > 1 ? 's' : ''} pending approval.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Latest Notices Section */}
                {notices.length > 0 && (
                    <div className="mt-8 bg-white border border-gray-200 shadow-sm">
                        <div className="bg-indigo-600 text-white px-6 py-4">
                            <h2 className="text-xl font-semibold">📢 Latest Notices</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {notices.map((notice) => (
                                    <div 
                                        key={notice._id} 
                                        className="border-l-4 border-blue-500 bg-blue-50 p-4 hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-1">{notice.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {notice.description.substring(0, 100)}...
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span>📅 {new Date(notice.date).toLocaleDateString()}</span>
                                                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full font-medium">
                                                        {notice.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <Link 
                                    to="/notices" 
                                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                >
                                    View All Notices →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
