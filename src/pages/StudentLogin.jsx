import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';

const StudentLogin = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                toast.success('Logged in successfully!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Incorrect password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    toast.error('No account found with this email.');
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid email address.');
                } else if (error.code === 'auth/invalid-credential') {
                    toast.error('Invalid email or password.');
                } else {
                    toast.error('Login failed: ' + error.message);
                }
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Logged in with Google successfully!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error('Google login failed: ' + error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-green-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 shadow-lg">
                            <FaGraduationCap className="text-white text-3xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Student Login
                        </h2>
                        <p className="text-gray-600">
                            JNU CSE Portal - Sign in to continue
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="student@jnu.ac.in"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link 
                                to="/forgot-password"
                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-all duration-300"
                    >
                        <FaGoogle className="text-red-500" size={18} />
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-6 pt-6 border-t border-gray-200">
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className="text-green-600 font-semibold hover:text-green-700"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;