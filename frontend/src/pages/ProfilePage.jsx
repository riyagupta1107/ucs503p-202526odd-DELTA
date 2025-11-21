import React,{useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


function StudentProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const auth = getAuth();
    const db = getFirestore();

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

    if (!userProfile) {
        return <div>Loading...</div>
    }
    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            <div>{userProfile.firstName} {userProfile.lastName}</div>
            <div>{userProfile.email}</div>
            <div>{userProfile.rollNo}</div>
        </div>
    );
}
export default StudentProfilePage;