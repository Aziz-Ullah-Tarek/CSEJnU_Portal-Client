import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
            toast.error('Password must be at least 6 characters long, contain at least one uppercase letter and one lowercase letter');
            return;
        }

        createUser(email, password)
            .then(() => {
                // Update user profile
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success('Account created successfully!');
                        form.reset();
                        setPassword('');
                        setShowPasswordError(false);
                        navigate('/');
                    })
                    .catch(error => {
                        toast.error('Failed to update profile: ' + error.message);
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('This email is already registered. Please login.');
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid email address.');
                } else if (error.code === 'auth/weak-password') {
                    toast.error('Password is too weak.');
                } else {
                    toast.error('Registration failed: ' + error.message);
                }
            });
    };

    const handleGoogleSignup = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Signed up with Google successfully!');
                navigate('/');
            })
            .catch(error => {
                toast.error('Google signup failed: ' + error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-5xl">🌱</span>
                        </div>
                        <h2 className="text-4xl font-bold text-green-700 mb-3">
                            Join GreenNest
                        </h2>
                        <p className="text-gray-600 text-base">
                            Create your account to start your plant journey
                        </p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                                Name
                            </label>
                            
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Enter your full name"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 text-gray-800"
                                required 
                            />
                        </div>

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
                                required 
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
                                Photo URL
                            </label>
                            <input 
                                type="url" 
                                name="photoURL"
                                placeholder="Enter your photo URL"
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 text-gray-800"
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
                                    placeholder="Create a password"
                                    className="w-full px-5 py-4 pr-14 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 text-gray-800"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setPassword(value);
                                        
                                        // Validate password
                                        const hasUpperCase = /[A-Z]/.test(value);
                                        const hasLowerCase = /[a-z]/.test(value);
                                        const hasMinLength = value.length >= 6;
                                        
                                        // Show error only if password is invalid
                                        setShowPasswordError(value.length > 0 && (!hasUpperCase || !hasLowerCase || !hasMinLength));
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                                >
                                    {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                </button>
                            </div>
                            {showPasswordError && (
                                <p className="mt-2.5 text-xs text-red-600 font-medium">
                                    Must contain at least 6 characters, one uppercase letter, and one lowercase letter
                                </p>
                            )}
                        </div>

                        {/* Register Button */}
                        <div className="mt-8">
                            <button 
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl text-base"
                            >
                                Register
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

                    {/* Google Signup Button */}
                    <button 
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
                    >
                        <FaGoogle size={20} />
                        Continue with Google
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/student-login" 
                                className="text-green-600 font-bold hover:text-green-700 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;