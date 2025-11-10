import React, { useEffect, useState } from 'react';
import '../styles/MarqueeSlider.css';

const MarqueeSlider = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from JSON
        fetch('/data/marquee-images.json')
            .then(res => res.json())
            .then(data => setImages(data.images))
            .catch(err => console.error('Error loading marquee images:', err));
    }, []);

    return (
        <div className="marquee-section">
            <div className="marquee-container">
                <div className="marquee-content">
                    {images.concat(images).map((image, index) => (
                        <div key={index} className="marquee-item">
                            <img 
                                src={image.url} 
                                alt={image.alt} 
                                className="marquee-image"
                            />
                            <div className="marquee-caption">{image.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarqueeSlider;
