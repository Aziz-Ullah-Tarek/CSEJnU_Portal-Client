import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-16 text-center flex flex-col justify-center min-h-[250px]">
                {/* Logo/Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8">CSE @ JNU</h2>
                
                {/* Navigation Links */}
                <nav className="mb-6">
                    <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <li>
                            <Link to="/" className="hover:text-white transition-colors">
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-white transition-colors">
                                ABOUT
                            </Link>
                        </li>
                        <li>
                            <Link to="/faculty" className="hover:text-white transition-colors">
                                FACULTY
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="hover:text-white transition-colors">
                                EVENTS
                            </Link>
                        </li>
                        <li>
                            <Link to="/gallery" className="hover:text-white transition-colors">
                                GALLERY
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition-colors">
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mb-6">
                    <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                    </a>
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500 mb-2">
                    Copyright ©{new Date().getFullYear()} All rights reserved | Department of CSE, Jagannath University
                </p>
                
                {/* Contact Email */}
                <p className="text-xs text-gray-500 mb-8">
                    Contact: <a href="mailto: cse@jnu.ac.bd" className="text-purple-400 hover:underline">cse@jnu.ac.bd</a>
                </p>
                
                {/* Developer Section */}
                <div className="mt-6 pt-6 ">
                    <p className="text-xs text-gray-400 mb-2">Developed by</p>
                    <div className="flex justify-center items-center gap-1 text-xs">
                        <a 
                            href="https://github.com/Aziz-Ullah-Tarek" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        >
                            Aziz Ullah Tarek
                        </a>
                        <span className="text-gray-500">&</span>
                        <a 
                            href="https://github.com/Ritu-Fardin" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        >
                            Ritu Fardin
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;