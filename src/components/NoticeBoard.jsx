import React, { useEffect, useState } from 'react';
import '../styles/NoticeBoard.css';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // Fetch notices from JSON (backend-ready)
        fetch('/data/notices.json')
            .then(res => res.json())
            .then(data => setNotices(data.notices))
            .catch(err => console.error('Error loading notices:', err));
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="notice-board">
            <div className="notice-header">
                <h2 className="notice-title">
                    <svg className="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Latest Notices
                </h2>
            </div>
            <div className="notice-list">
                {notices.map((notice, index) => (
                    <div key={notice.id || index} className="notice-item">
                        <div className="notice-date-badge">
                            {formatDate(notice.date)}
                        </div>
                        <div className="notice-content">
                            <h3 className="notice-item-title">{notice.title}</h3>
                            <p className="notice-description">{notice.description}</p>
                            {notice.link && (
                                <a href={notice.link} className="notice-link" target="_blank" rel="noopener noreferrer">
                                    Read More →
                                </a>
                            )}
                        </div>
                        {notice.isNew && <span className="new-badge">NEW</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeBoard;
