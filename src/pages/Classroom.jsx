import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Classroom = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    studentId: '',
    department: 'CSE',
    semester: '',
    subject: '',
    teacherName: '',
    teacherEmail: '',
    classroomId: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    participantsCount: ''
  });

  const classrooms = [
    { 
      id: 'CR-601', 
      name: 'Room 601', 
      capacity: 50,
      image: 'https://i.ibb.co.com/1GRtXWHQ/483899558-1477892656520411-8293499244406192577-n.jpg'
    },
    { 
      id: 'CR-721', 
      name: 'Room 721', 
      capacity: 40,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop'
    },
    { 
      id: 'CR-VCR', 
      name: 'Video Conference Room', 
      capacity: 30,
      image: 'https://i.ibb.co.com/rGtYQQ2t/167.jpg'
    },
    { 
      id: 'CR-712', 
      name: 'Room 712', 
      capacity: 60,
      image: 'https://i.ibb.co.com/93nM0yNc/482226463-1984357785303126-5317173868815496440-n.jpg'
    }
  ];

  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const fetchMyBookings = async () => {
    if (!user?.email) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/classroom-bookings/user/${user.email}`);
      const data = await response.json();
      setMyBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.displayName || '',
        userEmail: user.email || ''
      }));
      fetchMyBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login first!');
      return;
    }

    // Validation
    if (!formData.teacherName || !formData.teacherEmail) {
      toast.error('Teacher recommendation is mandatory!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/classroom-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('🎉 Classroom booking request submitted successfully!');
        // Reset form except user details
        setFormData({
          userName: user.displayName || '',
          userEmail: user.email || '',
          studentId: '',
          department: 'CSE',
          semester: '',
          subject: '',
          teacherName: '',
          teacherEmail: '',
          classroomId: '',
          date: '',
          startTime: '',
          endTime: '',
          purpose: '',
          participantsCount: ''
        });
        fetchMyBookings();
      } else {
        toast.error(data.message || 'Booking failed!');
      }
    } catch (error) {
      toast.error('Error submitting booking!');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Login Required</h2>
          <p className="text-gray-600">Please login to book a classroom</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header - University Style */}
        <div className="bg-white border-l-4 border-blue-600 shadow-sm mb-8 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Classroom Booking</h1>
          <p className="text-gray-600">Department of Computer Science & Engineering</p>
        </div>

        {/* Booking Form - Standard University Form */}
        <div className="bg-white shadow-sm border border-gray-200 mb-8">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">New Booking Request</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Student Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
                Student Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g., CSE-1901020123"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>{sem} Semester</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject/Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Data Structures and Algorithms"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teacher Recommendation - Highlighted */}
            <div className="mb-6 bg-amber-50 border border-amber-300 p-4 rounded">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">
                ⚠️ Teacher Recommendation (Mandatory)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="e.g., Dr. Ahmed Rahman"
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="teacherEmail"
                    value={formData.teacherEmail}
                    onChange={handleChange}
                    placeholder="teacher@jnu.ac.bd"
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
                Booking Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classroom <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="classroomId"
                    value={formData.classroomId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Classroom</option>
                    {classrooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name} (Capacity: {room.capacity})
                      </option>
                    ))}
                  </select>
                  
                  {/* Classroom Image Preview */}
                  {formData.classroomId && (
                    <div className="mt-4 rounded-lg overflow-hidden border-2 border-blue-200">
                      <img 
                        src={classrooms.find(r => r.id === formData.classroomId)?.image} 
                        alt={classrooms.find(r => r.id === formData.classroomId)?.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="bg-blue-50 p-3 border-t border-blue-200">
                        <p className="text-sm font-semibold text-gray-700">
                          <span className="text-blue-600">Selected:</span> {classrooms.find(r => r.id === formData.classroomId)?.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Capacity: {classrooms.find(r => r.id === formData.classroomId)?.capacity} students
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="participantsCount"
                    value={formData.participantsCount}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 40"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose of Booking <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Describe the purpose of booking..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>

        {/* My Bookings - Simple Table */}
        <div className="bg-white shadow-sm border border-gray-200">
          <div className="bg-green-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">My Booking History</h2>
          </div>

          <div className="p-6">
            {myBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Classroom</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Teacher</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{booking.subject}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {classrooms.find(r => r.id === booking.classroomId)?.name || booking.classroomId}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(booking.date).toLocaleDateString()}<br/>
                          <span className="text-xs text-gray-500">{booking.startTime} - {booking.endTime}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{booking.teacherName}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
