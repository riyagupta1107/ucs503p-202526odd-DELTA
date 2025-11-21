// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "student" or "professor"

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        setRole("");
        return;
      }

      setIsLoggedIn(true);

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setRole(snap.data().role); // student | professor
      }
    });

    return () => unsubscribe();
  }, []);

    const baseLinkClasses =
    "text-lg text-darkViolet hover:text-violet transition duration-300 font-inter rounded-full p-3 w-fit text-center bg-violet hover:bg-darkViolet";
    const buttonClasses = 'px-4 py-2 text-white rounded-lg transition duration-300 shadow-md font-inter';

  return (
    <nav className="flex justify-end items-center px-8 py-4 h-[80px]">

      <div className="flex items-center space-x-6 font-semibold text-xl">
        
        {/* HOME -- ROLE SPECIFIC */}
        {isLoggedIn && role === "student" && (
          <Link to="/student/dashboard" className={baseLinkClasses}>
            Home
          </Link>
        )}

        {isLoggedIn && role === "professor" && (
          <Link to="/professor/dashboard" className={baseLinkClasses}>
            Home
          </Link>
        )}

        {/* PROJECTS -- ROLE SPECIFIC */}
        {role === "professor" ? (
          <Link to="/projects1" className={baseLinkClasses}>
            Projects
          </Link>
        ) : (
          <Link to="/projects" className={baseLinkClasses}>
            Projects
          </Link>
        )}

        {/* PROFILE (same for both roles) */}
        {isLoggedIn ? (
          <Link to="/profile" className={baseLinkClasses}>
            My Account
          </Link>
        ) : (
          <Link to="/login" className={baseLinkClasses}>
            Login
          </Link>
        )}

      </div>
    </nav>
  );
}

export default NavBar;
