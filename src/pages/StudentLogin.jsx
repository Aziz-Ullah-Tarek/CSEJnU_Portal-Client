import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-5xl">🌿</span>
                        </div>
                        <h2 className="text-4xl font-bold text-green-700 mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600 text-base">
                            Login to continue your plant journey
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 text-gray-800"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-4 pr-14 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 text-gray-800"
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                                >
                                    {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-left">
                            <Link 
                                to="/forgot-password"
                                className="text-sm text-green-600 font-semibold hover:text-green-700 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <div className="mt-8">
                            <button 
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl text-base"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
                    >
                        <FaGoogle size={20} />
                        Continue with Google
                    </button>

                    {/* Signup Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                to="/register" 
                                className="text-green-600 font-bold hover:text-green-700 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;