import React from 'react';

const Gallery = () => {
    const galleryItems = [
        { id: 1, title: 'Tech Fest 2024', category: 'Events' },
        { id: 2, title: 'Computer Lab', category: 'Facilities' },
        { id: 3, title: 'Graduation Ceremony', category: 'Events' },
        { id: 4, title: 'Research Lab', category: 'Facilities' },
        { id: 5, title: 'Workshop Session', category: 'Activities' },
        { id: 6, title: 'Seminar Hall', category: 'Facilities' },
        { id: 7, title: 'Coding Competition', category: 'Events' },
        { id: 8, title: 'Faculty Meeting', category: 'Activities' },
        { id: 9, title: 'Student Projects', category: 'Academic' },
        { id: 10, title: 'Campus View', category: 'Campus' },
        { id: 11, title: 'Library', category: 'Facilities' },
        { id: 12, title: 'Sports Day', category: 'Events' },
    ];

    const categories = ['All', 'Events', 'Facilities', 'Activities', 'Academic', 'Campus'];
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredItems = selectedCategory === 'All' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">Gallery</h1>
                    <p className="text-xl text-center mt-4">Moments captured from our journey</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
                            <figure className="h-48 bg-linear-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
                                <div className="text-white text-6xl">📷</div>
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="card-title text-lg">{item.title}</h3>
                                <div className="badge badge-primary badge-sm">{item.category}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-2xl text-gray-500">No images found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
