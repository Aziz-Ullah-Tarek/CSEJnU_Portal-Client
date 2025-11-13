// API Base URL
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://cse-portal-server.vercel.app' 
  : 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Notice endpoints
  notices: `${API_BASE_URL}/api/notices`,
  noticesLatest: `${API_BASE_URL}/api/notices/latest`,
  noticeById: (id) => `${API_BASE_URL}/api/notices/${id}`,
  
  // Classroom booking endpoints
  classroomBookings: `${API_BASE_URL}/api/classroom-bookings`,
  classroomBookingsByUser: (email) => `${API_BASE_URL}/api/classroom-bookings/user/${email}`,
  
  // Lab booking endpoints
  labBookings: `${API_BASE_URL}/api/lab-bookings`,
  labBookingsByUser: (email) => `${API_BASE_URL}/api/lab-bookings/user/${email}`,
  
  // Dashboard endpoints
  userDashboard: (email) => `${API_BASE_URL}/api/user-dashboard/${email}`,
  
  // Gallery endpoints
  gallery: `${API_BASE_URL}/api/gallery`,
  galleryByCategory: (category) => `${API_BASE_URL}/api/gallery/category/${category}`,
  
  // Events endpoints
  events: `${API_BASE_URL}/api/events`,
  eventById: (id) => `${API_BASE_URL}/api/events/${id}`,
};
