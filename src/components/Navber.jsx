import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoticeDropdown, setShowNoticeDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Debug log
  React.useEffect(() => {
    if (user) {
      console.log('👤 User logged in:', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        hasPhoto: !!user.photoURL
      });
    } else {
      console.log('❌ No user logged in');
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully!');
        setShowDropdown(false);
        navigate('/');
      })
      .catch((error) => {
        toast.error('Logout failed: ' + error.message);
      });
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-600 via-yellow-300 to-blue-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
            CSE @ JNU
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`hover:opacity-80 transition ${isActive('/') ? 'font-bold' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`hover:opacity-80 transition ${isActive('/about') ? 'font-bold' : ''}`}>
              About
            </Link>
            
            {/* Academics Dropdown */}
            <div className="relative group">
              <button className="hover:opacity-80 transition flex items-center gap-1">
                Booking
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/classroom" className="block px-4 py-2 hover:bg-purple-100 rounded-t-lg">
                  Classrooms
                </Link>
                <Link to="/lab" className="block px-4 py-2 hover:bg-purple-100 rounded-b-lg">
                  Labs
                </Link>
              </div>
            </div>

            <Link to="/faculty" className={`hover:opacity-80 transition ${isActive('/faculty') ? 'font-bold' : ''}`}>
              Faculty
            </Link>
            
            {/* Notices Dropdown */}
            <div className="relative group">
              <button className="hover:opacity-80 transition flex items-center gap-1">
                Notices
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/notices" className="block px-4 py-2 hover:bg-green-100 rounded-t-lg">
                  All Notices
                </Link>
                {user && (
                  <Link to="/manage-notices" className="block px-4 py-2 hover:bg-green-100 rounded-b-lg">
                    Manage Notices
                  </Link>
                )}
              </div>
            </div>

            <Link to="/events" className={`hover:opacity-80 transition ${isActive('/events') ? 'font-bold' : ''}`}>
              Events
            </Link>
            <Link to="/gallery" className={`hover:opacity-80 transition ${isActive('/gallery') ? 'font-bold' : ''}`}>
              Gallery
            </Link>
            <Link to="/contact" className={`hover:opacity-80 transition ${isActive('/contact') ? 'font-bold' : ''}`}>
              Contact
            </Link>
          </div>

          {/* Login Buttons / User Profile */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/40';
                    }}
                  />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 transition flex items-center gap-2 text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/student-login" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition">
                  Login
                </Link>
                <Link to="/admin" className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-semibold">
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-white/20 pt-4">
            <Link to="/" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/classroom" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Classrooms
            </Link>
            <Link to="/lab" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Labs
            </Link>
            <Link to="/faculty" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Faculty
            </Link>
            
            {/* Notices Dropdown Mobile */}
            <div>
              <button 
                onClick={() => setShowNoticeDropdown(!showNoticeDropdown)}
                className="w-full text-left py-2 hover:bg-white/10 rounded px-2 flex items-center justify-between"
              >
                Notices
                <svg className={`w-4 h-4 transition-transform ${showNoticeDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showNoticeDropdown && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link to="/notices" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
                    All Notices
                  </Link>
                  {user && (
                    <Link to="/manage-notices" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
                      Manage Notices
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link to="/events" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Events
            </Link>
            <Link to="/gallery" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link to="/contact" className="block py-2 hover:bg-white/10 rounded px-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  <div className="px-2 py-2 border border-white/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/40'}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{user.displayName || 'User'}</p>
                        <p className="text-xs opacity-80 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block py-2 border border-white rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/student-login" className="block py-2 border border-white rounded-lg text-center" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/admin" className="block py-2 bg-white text-purple-600 rounded-lg text-center font-semibold" onClick={() => setIsOpen(false)}>
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navber;
