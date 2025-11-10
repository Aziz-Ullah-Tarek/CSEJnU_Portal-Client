import React, { useState } from 'react';

const Admin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Admin login attempt:', formData);
        alert('Admin authentication will be implemented with backend integration');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-purple-900 py-12 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <div className="text-center mb-6">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-red-600 text-white rounded-full w-20 h-20">
                                <span className="text-3xl">🔐</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-red-600">Admin Panel</h2>
                        <p className="text-gray-600 mt-2">Authorized access only</p>
                    </div>

                    <div className="alert alert-warning shadow-lg mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-xs">Restricted area. All activities are logged.</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Admin username"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Admin password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-error w-full text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure Login
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold mb-2 text-sm">Admin Features:</h3>
                        <ul className="text-xs space-y-1 text-gray-700">
                            <li>• Manage Student Records</li>
                            <li>• Faculty Management</li>
                            <li>• Course Administration</li>
                            <li>• Event Management</li>
                            <li>• System Configuration</li>
                            <li>• Reports & Analytics</li>
                        </ul>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            Need help? Contact IT Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
