// src/pages/StudentDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetches data from the new mock student route
                // This route is handled by backend/studentRoutes.js
                const response = await axios.get('/api/student/dashboard'); 
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching student dashboard:", error);
                setDashboardData(null); 
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading Student Dashboard...</div>;
    }

    if (!dashboardData) {
        return <div className="text-center py-8 text-red-600">Could not load dashboard data. Please ensure your backend is running.</div>;
    }

    // Prepare status cards data based on the statusCounts from the backend
    const statusCards = [
        { title: "Total Applied", value: dashboardData.totalApplied, bgColor: 'bg-indigo-500' },
        { title: "Under Review", value: dashboardData.statusCounts["Under Review"] || 0, bgColor: 'bg-yellow-500' },
        { title: "Interview Scheduled", value: dashboardData.statusCounts["Interview Scheduled"] || 0, bgColor: 'bg-green-500' },
        { title: "Rejected/Closed", value: dashboardData.statusCounts["Rejected"] || 0, bgColor: 'bg-red-500' },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome back, {dashboardData.name}!</h1>
            
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