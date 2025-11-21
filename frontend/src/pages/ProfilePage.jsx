import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


function ProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async(user) => {
            if (user) {
                // User is signed in
                const docRef = doc(db,"users",user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            } else {
                // User is signed out
                setUserProfile(null);
            }
        });
        return () => unsubscribe();
    }, [auth,db]);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Navigate to Home page
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };
    if (!userProfile) {
        return <div>Loading...</div>
    }
    return (
        <div className="max-w-xl mx-auto p-6 mt-16">
            
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-darkViolet text-white rounded-full flex justify-center items-center text-4xl font-semibold shadow-md">
                        {userProfile.firstName?.charAt(0)}
                    </div>
                    <h2 className="text-3xl font-bold mt-4 text-gray-800">
                        {userProfile.firstName} {userProfile.lastName}
                    </h2>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gray-300"></div>

                {/* Profile Information */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Email ID</h3>
                        <p className="text-lg text-gray-800">{userProfile.email}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Roll Number</h3>
                        <p className="text-lg text-gray-800">{userProfile.rollNo}</p>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="mt-10 pt-6 border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className="w-full bg-darkViolet hover:bg-violet text-white font-inter text-xl font-bold py-3 px-6 rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2"
                >
                    <span>Sign Out</span>
                    
                </button>
            </div>
        </div>

    );
}
export default ProfilePage;