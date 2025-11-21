import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.jsx'; // Added .jsx extension to fix resolution error
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

function StudentDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  // ----------------------------------------
  // 1. LOAD FIRESTORE USER DATA
  // ----------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserProfile(snap.data());
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  // ----------------------------------------
  // 2. LOAD STUDENT APPLICATIONS FROM BACKEND
  // ----------------------------------------
  useEffect(() => {
    const loadApps = async () => {
      // CRITICAL FIX: Stop execution if userProfile is not loaded yet.
      if (!userProfile) return;

      let roll = userProfile.rollNo;

      // If rollNo is missing in Firestore, try to fix it using MongoDB data
      if (!roll) {
        console.warn("Firestore missing rollNo — attempting fix via MongoDB...");

        try {
          const res = await axios.get(`/api/student/by-email/${userProfile.email}`);
          
          if (res.data?.rollNo) {
            roll = res.data.rollNo;

            // Update Firestore with the correct rollNo
            await setDoc(doc(db, "users", auth.currentUser.uid), {
              ...userProfile,
              rollNo: roll
            });

            // Update local state immediately
            setUserProfile(prev => ({ ...prev, rollNo: roll }));
          }
        } catch (e) {
          console.error("Failed to recover roll number:", e);
        }
      }

      if (!roll) return; 

      // Finally, fetch applications using the roll number
      try {
        const apps = await axios.get(`/api/student/${roll}/applications`);
        setApplications(apps.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    loadApps();
  }, [userProfile, auth, db]); 

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;
  if (!userProfile) return <div className="p-10 text-center">Error loading profile. Please try logging in again.</div>;

  const applied = applications;
  const accepted = applications.filter(a => a.status === "accepted");

  return (
    <div>
      <NavBar />

      <div className="p-6 mt-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {userProfile.firstName}!</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-xl font-semibold text-gray-600">Total Applied</p>
            <p className="text-4xl mt-3 font-bold text-violet">{applied.length}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-xl font-semibold text-gray-600">Accepted</p>
            <p className="text-4xl mt-3 font-bold text-green-500">{accepted.length}</p>
          </div>
        </div>

        {/* Applied Projects List */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Applied Projects</h2>
        
        {applied.length === 0 ? (
          <p className="text-gray-500 italic">You haven't applied to any projects yet.</p>
        ) : (
          <div className="grid gap-6">
            {applied.map((app) => (
              <div key={app.applicationId} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{app.project?.title || "Unknown Project"}</h3>
                    <p className="text-gray-600 mt-2">{app.project?.description || "No description available."}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accepted Projects List (Optional separate view) */}
        {accepted.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Accepted Projects</h2>
            <div className="grid gap-6">
              {accepted.map((app) => (
                <div key={`acc-${app.applicationId}`} className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
                  <h3 className="font-bold text-xl text-gray-800">{app.project?.title}</h3>
                  <p className="text-gray-600 mt-2">{app.project?.description}</p>
                  <p className="text-sm mt-3 font-bold text-green-600">🎉 Congratulations! Application Accepted.</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default StudentDashboard;