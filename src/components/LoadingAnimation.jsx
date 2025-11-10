import React, { useState, useEffect } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onComplete }) => {
    const [currentLetter, setCurrentLetter] = useState(0);
    const letters = ['C', 'S', 'E', 'J', 'N', 'U'];
    const totalLetters = letters.length;

    useEffect(() => {
        if (currentLetter < totalLetters) {
            const timer = setTimeout(() => {
                setCurrentLetter(currentLetter + 1);
            }, 400); // 400ms between each letter
            return () => clearTimeout(timer);
        } else {
            // Wait for 'U' to expand and then fade out
            const timer = setTimeout(() => {
                onComplete();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [currentLetter, totalLetters, onComplete]);

    return (
        <div className={`loading-screen ${currentLetter === totalLetters ? 'fade-out' : ''}`}>
            <div className="letters-container">
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className={`letter ${index < currentLetter ? 'show' : ''} ${
                            index === totalLetters - 1 && currentLetter === totalLetters ? 'expand' : ''
                        }`}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LoadingAnimation;
