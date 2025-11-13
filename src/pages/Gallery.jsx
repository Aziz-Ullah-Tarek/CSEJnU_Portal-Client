import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Gallery = () => {
    const { user } = useContext(AuthContext);
    const [galleryItems, setGalleryItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        category: 'Events',
        description: '',
        uploadedBy: user?.displayName || '',
        uploaderEmail: user?.email || ''
    });

    const categories = ['All', 'Events', 'Facilities', 'Activities', 'Academic', 'Campus'];

    useEffect(() => {
        fetchGalleryPhotos();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                uploadedBy: user.displayName || '',
                uploaderEmail: user.email || ''
            }));
        }
    }, [user]);

    const fetchGalleryPhotos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/gallery');
            const data = await response.json();
            setGalleryItems(data);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to upload photos!');
            return;
        }

        if (!formData.title || !formData.imageUrl) {
            toast.error('Title and Image URL are required!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('📷 Photo uploaded successfully!');
                setFormData({
                    title: '',
                    imageUrl: '',
                    category: 'Events',
                    description: '',
                    uploadedBy: user?.displayName || '',
                    uploaderEmail: user?.email || ''
                });
                setShowUploadForm(false);
                fetchGalleryPhotos();
            } else {
                toast.error(data.message || 'Upload failed!');
            }
        } catch (error) {
            toast.error('Error uploading photo!');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = selectedCategory === 'All' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white shadow-lg mb-12 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-2">📷 Gallery</h1>
                            <p className="text-purple-100 text-lg">Capturing moments, preserving memories</p>
                        </div>
                        {user && (
                            <button
                                onClick={() => setShowUploadForm(!showUploadForm)}
                                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
                            >
                                {showUploadForm ? '✕ Close' : '+ Upload Photo'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12">
                {/* Upload Form */}
                {showUploadForm && (
                    <div className="bg-white rounded-2xl shadow-xl mb-12 p-8 border border-gray-100">
                        <div className="border-l-4 border-purple-600 pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Upload New Photo</h2>
                            <p className="text-gray-500 text-base mt-2">Share your moments with the community</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Photo Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                        placeholder="e.g., Tech Fest 2024"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                    >
                                        <option value="Events">Events</option>
                                        <option value="Facilities">Facilities</option>
                                        <option value="Activities">Activities</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Campus">Campus</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2 ml-1">Use image hosting services like Imgur, Cloudinary, or direct URLs</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                    placeholder="Brief description about the photo..."
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </span>
                                    ) : '📤 Upload Photo'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUploadForm(false)}
                                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-md ${
                                selectedCategory === category 
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl scale-105' 
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid - Modern Cards with Better Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredItems.map((item) => (
                        <div 
                            key={item._id} 
                            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-3 border border-gray-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
                                {item.imageUrl ? (
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/500x400?text=Image+Not+Found';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-gray-300 text-8xl">📷</div>
                                    </div>
                                )}
                                
                                {/* Category Badge Overlay */}
                                <div className="absolute top-4 right-4">
                                    <span className="px-5 py-2 bg-white/95 backdrop-blur-sm text-purple-700 text-sm font-bold rounded-full shadow-xl border border-purple-100">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-1 group-hover:text-purple-600 transition-colors">
                                    {item.title}
                                </h3>
                                
                                {item.description && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                                
                                {item.uploadedBy && (
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                            {item.uploadedBy.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">Uploaded by</p>
                                            <p className="text-sm font-bold text-gray-800">{item.uploadedBy}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="text-8xl mb-6 animate-pulse">📷</div>
                        <p className="text-3xl font-bold text-gray-800 mb-2">No photos found</p>
                        <p className="text-gray-500 text-lg">
                            {selectedCategory !== 'All' 
                                ? `No images in ${selectedCategory} category yet` 
                                : 'Be the first to upload a photo!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
