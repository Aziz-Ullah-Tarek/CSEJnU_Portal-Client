import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManageNotices = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [formData, setFormData] = useState({
        topic: '',
        description: '',
        img: '',
        author: '',
        category: 'Academic',
        important: false
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch('https://cse-portal-server.vercel.app/api/notices');
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            toast.error('Failed to fetch notices');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNotice) {
                // Update notice
                const response = await fetch(`http://localhost:5000/api/notices/${editingNotice._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    toast.success('Notice updated successfully!');
                    fetchNotices();
                    resetForm();
                }
            } else {
                // Create new notice
                const response = await fetch('http://localhost:5000/api/notices', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    toast.success('Notice created successfully!');
                    fetchNotices();
                    resetForm();
                }
            }
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    toast.success('Notice deleted successfully!');
                    fetchNotices();
                }
            } catch (error) {
                toast.error('Failed to delete notice');
            }
        }
    };

    const handleEdit = (notice) => {
        setEditingNotice(notice);
        setFormData({
            topic: notice.topic,
            description: notice.description,
            img: notice.img,
            author: notice.author || '',
            category: notice.category,
            important: notice.important || false
        });
        setIsFormOpen(true);
    };
    const resetForm = () => {
        setFormData({
            topic: '',
            description: '',
            img: '',
            author: '',
            category: 'Academic',
            important: false
        });
        setEditingNotice(null);
        setIsFormOpen(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Notices</h1>
                        <p className="text-gray-600">Create, update, and delete notice announcements</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/notices')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
                        >
                            <FaEye />
                            View Notices
                        </button>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
                        >
                            <FaPlus />
                            Add New Notice
                        </button>
                    </div>
                </div>

                {/* Notice Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 flex justify-between items-center sticky top-0 z-10">
                                <div>
                                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                        {editingNotice ? (
                                            <>
                                                <FaEdit size={28} />
                                                Edit Notice
                                            </>
                                        ) : (
                                            <>
                                                <FaPlus size={28} />
                                                Create New Notice
                                            </>
                                        )}
                                    </h2>
                                    <p className="text-green-100 text-sm mt-1">Fill in the details below</p>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="text-white hover:bg-white/20 p-2 rounded-full transition"
                                >
                                    <FaTimes size={28} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {/* Topic Field */}
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        Topic / Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-gray-900 font-medium"
                                        placeholder="Enter notice topic..."
                                        required
                                    />
                                </div>

                                {/* Description Field */}
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="6"
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all resize-none text-gray-900"
                                        placeholder="Enter detailed description..."
                                        required
                                    />
                                </div>

                                {/* Image URL Field */}
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        Image URL *
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.img}
                                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-gray-900"
                                        placeholder="https://images.unsplash.com/photo-..."
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        💡 Use Unsplash or any high-quality image URL
                                    </p>
                                </div>

                                {/* Author Field */}
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        Author / Posted By *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-gray-900"
                                        placeholder="e.g., Dr. Rahman Ahmed - Head, CSE Department"
                                        required
                                    />
                                </div>

                                {/* Category and Important */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-gray-900 font-medium"
                                        >
                                            <option value="Academic">📚 Academic</option>
                                            <option value="Event">🎉 Event</option>
                                            <option value="Placement">💼 Placement</option>
                                            <option value="Workshop">🔧 Workshop</option>
                                            <option value="Facility">🏢 Facility</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center pt-6">
                                        <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-5 py-4 rounded-xl hover:bg-gray-100 transition-all w-full">
                                            <input
                                                type="checkbox"
                                                checked={formData.important}
                                                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                                                className="w-6 h-6 text-green-600 rounded-lg focus:ring-green-500 focus:ring-4"
                                            />
                                            <span className="text-sm font-bold text-gray-700">
                                                ⭐ Mark as Important
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl text-lg"
                                    >
                                        <FaSave size={20} />
                                        {editingNotice ? 'Update Notice' : 'Create Notice'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-bold transition-all text-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Notices Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Topic</th>
                                    <th className="px-6 py-4 text-left">Category</th>
                                    <th className="px-6 py-4 text-left">Date</th>
                                    <th className="px-6 py-4 text-center">Important</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {notices.map((notice) => (
                                    <tr key={notice._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{notice.topic}</div>
                                            <div className="text-sm text-gray-600 line-clamp-1">{notice.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                {notice.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(notice.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {notice.important && (
                                                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                                                    Important
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(notice)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(notice._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageNotices;
