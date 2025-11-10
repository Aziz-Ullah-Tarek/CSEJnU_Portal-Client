import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">About Us</h1>
                    <p className="text-xl text-center mt-4">Learn more about our department</p>
                </div>
            </div>

            {/* About Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg mb-4">
                            The Department of Computer Science and Engineering at Jagannath University 
                            is committed to providing world-class education in computing and technology.
                        </p>
                        <p className="text-lg mb-4">
                            We strive to create an environment that fosters innovation, critical thinking, 
                            and practical skills that prepare our students for successful careers in the 
                            ever-evolving tech industry.
                        </p>
                        <p className="text-lg">
                            Our programs are designed to combine theoretical knowledge with hands-on 
                            experience, ensuring that graduates are well-equipped to tackle real-world 
                            challenges.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600">✓</span>
                                <span>Excellence in Computer Science Education</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600">✓</span>
                                <span>Cutting-edge Research and Innovation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600">✓</span>
                                <span>Industry-Academia Collaboration</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600">✓</span>
                                <span>Holistic Student Development</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600">✓</span>
                                <span>Global Competitiveness</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Department History */}
                <div className="mt-16">
                    <h2 className="text-4xl font-bold text-center mb-8">Our Journey</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="timeline">
                            <p className="text-lg text-center mb-8">
                                Established with a vision to produce skilled computer science professionals, 
                                our department has grown significantly over the years. We continue to evolve 
                                with the latest technological advancements and industry requirements.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mt-16">
                    <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-3">🎯</div>
                                <h3 className="card-title text-lg">Excellence</h3>
                                <p className="text-sm">Striving for the highest standards in everything we do</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-3">🤝</div>
                                <h3 className="card-title text-lg">Integrity</h3>
                                <p className="text-sm">Upholding ethical principles and honesty</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-3">💡</div>
                                <h3 className="card-title text-lg">Innovation</h3>
                                <p className="text-sm">Encouraging creativity and new ideas</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-3">🌟</div>
                                <h3 className="card-title text-lg">Collaboration</h3>
                                <p className="text-sm">Working together towards common goals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
