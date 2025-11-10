import React from 'react';
import { Link } from 'react-router-dom';
import MarqueeSlider from '../components/MarqueeSlider';
import NoticeBoard from '../components/NoticeBoard';

const Home = () => {
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
                    {/* Notice Board */}
                    <div className="lg:col-span-2">
                        <NoticeBoard />
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
