import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../components/NavBar';
import { auth, db } from '../firebase'; // Import auth and db
import { onAuthStateChanged } from 'firebase/auth'; // Import auth listener
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

function StudentDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null); // State for user's profile
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        // This listener waits for Firebase to be ready
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // --- User is logged in ---
                try {
                    // 1. Fetch user's name from Firestore
                    // We know from RegisterPage.jsx this is stored in "users/{user.uid}"
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUserData(userDoc.data()); // This will be { firstName, lastName, ... }
                    } else {
                        console.error("No user data found in Firestore!");
                        // You could redirect to a "create profile" page if needed
                    }

                    // 2. Fetch the dashboard stats (your original call)
                    // We can also send the user's token to secure the backend
                    const token = await user.getIdToken();
                    const response = await axios.get('/api/student/dashboard', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }); 
                    setDashboardData(response.data);

                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                    setDashboardData(null); 
                } finally {
                    setLoading(false);
                }
            } else {
                // --- User is NOT logged in ---
                // Redirect to the login page
                setLoading(false);
                navigate('/login');
            }
        });

        // Cleanup: Stop listening when the component unmounts
        return () => unsubscribe();
    }, [navigate]); // Add navigate to dependency array

    if (loading) {
        return <div className="text-center py-8">Loading Student Dashboard...</div>;
    }

    // Now check for *both* data sources
    if (!dashboardData || !userData) {
        return <div className="text-center py-8 text-red-600">Could not load dashboard data. Please ensure your backend is running.</div>;
    }

    // Prepare status cards data based on the statusCounts from the backend
    const statusCards = [
        { title: "Total Applied", value: dashboardData.totalApplied, bgColor: 'bg-indigo-500' },
        { title: "Under Review", value: dashboardData.statusCounts["Under Review"] || 0, bgColor: 'bg-yellow-500' },
        { title: "Interview Scheduled", value: dashboardData.statusCounts["Interview Scheduled"] || 0, bgColor: 'bg-green-500' },
        { title: "Rejected/Closed", value: (dashboardData.statusCounts["Rejected"] || 0) + (dashboardData.statusCounts["Closed"] || 0), bgColor: 'bg-red-500' },
    ];

    return (
        <div className="p-8 font-inter">
            {/* Based on your new App.js, NavBar is needed here */}
            <NavBar /> 
            
            {/* Use the name from Firestore (userData) */}
            <h1 className="text-3xl font-bold mb-6">Welcome back, {userData.firstName}!</h1>
            
            {/* Quick Stats Grid (Application Overview) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {statusCards.map(card => (
                    <div key={card.title} className={`${card.bgColor} text-white p-6 rounded-xl shadow-lg`}>
                        <div className="text-sm font-semibold opacity-80">{card.title}</div>
                        <div className="text-4xl font-extrabold mt-1">{card.value}</div>
                    </div>
                ))}
            </div>

            {/* Application History Call to Action */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                <h2 className="text-2xl font-semibold mb-3">Your Application Summary</h2>
                <p className="text-gray-600 mb-4">
                    View the full history and detailed status updates for all your project applications.
                </p>
                <Link 
                    to="/student/applications" 
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Go to My Applications
                </Link>
            </div>
        </div>
    );
}

export default StudentDashboardPage;

