// API Service Layer for Backend Integration
// Create this file when you're ready to connect your backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
};

// ============================================
// PUBLIC DATA ENDPOINTS (No authentication)
// ============================================

export const fetchMarqueeImages = async () => {
    return apiCall('/marquee-images');
};

export const fetchNotices = async () => {
    return apiCall('/notices');
};

export const fetchFaculty = async () => {
    return apiCall('/faculty');
};

export const fetchEvents = async () => {
    return apiCall('/events');
};

export const fetchGallery = async () => {
    return apiCall('/gallery');
};

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

export const studentLogin = async (email, password) => {
    return apiCall('/student/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const adminLogin = async (username, password) => {
    return apiCall('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
};

// ============================================
// PROTECTED ENDPOINTS (Require authentication)
// ============================================

export const fetchStudentProfile = async (token) => {
    return apiCall('/student/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const createNotice = async (token, noticeData) => {
    return apiCall('/admin/notices', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
    });
};

export const updateNotice = async (token, noticeId, noticeData) => {
    return apiCall(`/admin/notices/${noticeId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
    });
};

export const deleteNotice = async (token, noticeId) => {
    return apiCall(`/admin/notices/${noticeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// In your component:

import { fetchNotices, studentLogin } from './services/api';

// Fetch notices
useEffect(() => {
    fetchNotices()
        .then(data => setNotices(data.notices))
        .catch(err => console.error('Error fetching notices:', err));
}, []);

// Student login
const handleLogin = async (email, password) => {
    try {
        const response = await studentLogin(email, password);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid credentials');
    }
};
*/

// ============================================
// EXPECTED BACKEND API RESPONSE FORMATS
// ============================================

/*
GET /api/marquee-images
Response: { images: [...] }

GET /api/notices
Response: { notices: [...] }

GET /api/faculty
Response: { faculty: [...] }

GET /api/events
Response: { events: [...] }

POST /api/student/login
Request: { email: string, password: string }
Response: { token: string, user: { id, name, email, ... } }

POST /api/admin/login
Request: { username: string, password: string }
Response: { token: string, admin: { id, name, role, ... } }
*/
