import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MarqueeSlider from '../components/MarqueeSlider';
import { FaBell, FaCalendarAlt, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [latestNotices, setLatestNotices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/notices/latest')
            .then(res => res.json())
            .then(data => setLatestNotices(data))
            .catch(err => console.error('Error fetching notices:', err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Hero Section */}
<div className="relative flex items-center justify-center min-h-[30vh] bg-gradient-to-r from-cyan-600 via-cyan-300 to-blue-500 text-white">
  <div className="w-11/12 max-w-5xl mx-auto text-center px-4">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
      CSE @ JNU
    </h1>
    <p className="text-lg md:text-xl mb-3 font-medium">
      Department of Computer Science and Engineering
      
    </p>
  
    <div className="flex gap-3 justify-center items-center flex-wrap ">
      <Link
        to="/about"
        className="px-6 py-2.5 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
      >
        Learn More
      </Link>
      <Link
        to="/contact"
        className="px-6 py-2.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
      >
        Contact Us
      </Link>
    </div>
  </div>
</div>



            {/* Marquee Slider */}
            <MarqueeSlider />

            {/* Main Content - w-11/12 */}
            <div className="w-11/12 max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Latest Notices Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <FaBell className="text-green-600" />
                                    Latest Notices
                                </h2>
                                <Link
                                    to="/notices"
                                    className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                                >
                                    View All <FaArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-5">
                                {latestNotices.map((notice) => (
                                    <div
                                        key={notice._id}
                                        className="group bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        onClick={() => navigate(`/notice/${notice._id}`)}
                                    >
                                        <div className="flex gap-5">
                                            {/* Notice Image */}
                                            <div className="relative w-28 h-28 flex-shrink-0">
                                                <img
                                                    src={notice.img}
                                                    alt={notice.topic}
                                                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                                                
                                                {/* Category Badge on Image */}
                                                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-green-700">
                                                    {notice.category}
                                                </div>
                                            </div>
                                            
                                            {/* Notice Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h3 className="font-bold text-gray-900 line-clamp-2 text-base group-hover:text-green-600 transition-colors leading-tight">
                                                        {notice.topic}
                                                    </h3>
                                                    {notice.important && (
                                                        <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 animate-pulse">
                                                            <FaExclamationCircle size={11} />
                                                            HOT
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Author */}
                                                {notice.author && (
                                                    <p className="text-xs text-green-600 font-medium mb-2">
                                                        📝 {notice.author}
                                                    </p>
                                                )}
                                                
                                                {/* Description */}
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                                                    {notice.description}
                                                </p>
                                                
                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                    <span className="text-gray-500 text-xs flex items-center gap-1.5 font-medium">
                                                        <FaCalendarAlt size={12} />
                                                        {new Date(notice.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <button className="text-green-600 hover:text-white bg-green-50 hover:bg-green-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5">
                                                        Read More
                                                        <FaArrowRight size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {latestNotices.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No notices available</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Quick Links Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Quick Access
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link to="/student-login" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                        Student Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faculty" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                        Faculty Members
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/events" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/gallery" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                        Gallery
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-5 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold mb-3">Contact</h3>
                            <div className="space-y-2 text-xs">
                                <p>📍 JNU, Dhaka</p>
                                <p>📧 cse@jnu.ac.bd</p>
                                <p>📞 +880-XXX-XXXXXX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-12">
                <div className="w-11/12 max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { icon: '🎓', title: 'Quality Education', desc: 'Modern curriculum for tech industry' },
                            { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Experienced & qualified professors' },
                            { icon: '🔬', title: 'Modern Labs', desc: 'State-of-the-art facilities' }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                                <div className="text-4xl mb-3">{feature.icon}</div>
                                <h3 className="text-lg font-bold mb-1.5 text-gray-800">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-cyan-600 to-yellow-200 py-10 text-white">
                <div className="w-11/12 max-w-7xl mx-auto  px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                            <div className="text-sm">Students</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">30+</div>
                            <div className="text-sm">Faculty</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
                            <div className="text-sm">Labs</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
                            <div className="text-sm">Projects</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
