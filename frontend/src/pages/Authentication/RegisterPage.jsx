import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth,db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
    role: '',
  });

  const [errors, setErrors] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name] : type === 'checkbox' ? checked : value
    }));
  }

  // validation on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.firstName.trim()) validationErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) validationErrors.lastName = 'Last name is required';
    if (!formData.rollNo.trim()) validationErrors.rollNo = 'Roll number is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Invalid email';

    if (!formData.password) validationErrors.password = 'Password is required';
    else if (formData.password.length < 6) validationErrors.password = 'Minimum 6 characters';

    if (formData.confirmPassword !== formData.password) validationErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreed) validationErrors.agreed = 'You must agree to terms';
    if (!formData.role) validationErrors.role = 'Please select your role';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(userCredential.user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
        
        console.log("Writing to Firestore...", user.uid, formData);

        

        let pidValue = ""

        // --- Save to MongoDB for professors ---
        if (formData.role === "professor") {
          const profRes =  await axios.post(`${API_BASE_URL}/api/professor/register`, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
          });
          pidValue = profRes.data.pid;
        }
        // save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          rollNo: formData.rollNo || "",
          email: formData.email || "",
          role: formData.role || "",
          pid: pidValue || null,
          createdAt: new Date().toISOString(),
        });

        console.log("About to navigate...");

        alert("Registration successful!");
        navigate('/login');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already in use');
        } else if (error.code === 'auth/invalid-email') {
          alert('Invalid email address');
        } else {
          alert('Registration failed: ' + error.message);
        }
      }      
    }
  }
  return (
    // Outer container: Full screen height, custom green background,
    // and uses flexbox to center its child (the form) both horizontally and vertically.
    <div className="w-full min-h-screen bg-bgCustom flex items-center justify-center p-4"> {/* Added p-4 for padding on small screens */}
      {/* The form itself:
          - bg-white: Gives it a white background
          - p-8: Adds internal padding
          - rounded-lg: Rounded corners
          - shadow-lg: A nice shadow
          - w-full max-w-2xl: Makes it responsive, taking full width up to a max of 2xl (approx 48rem/768px)
          - mx-auto: Centers the form horizontally if its width is less than 100%
      */}
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleSubmit}>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-customDarkText font-inter">Create an Account</h2>

        
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 font-inter">First name</label>
            <input
              type="text"
              id="first_name"
              name="firstName" 
              value={formData.firstName} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Last name</label>
            <input
              type="text"
              id="last_name"
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Doe"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="rollNo" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Roll number</label>
            <input
              type="tel"
              id="rollNo"
              name='rollNo'
              value={formData.rollNo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkViolet focus:border-darkViolet block w-full p-2.5"
              required
            />
            {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
          </div>
          {/* Add more fields for Email, Password, Confirm Password within the grid or below */}
          {/* Example for Email within grid: */}
          {/* <div>
            <label htmlFor="email_grid" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Email address</label>
            <input
              type="email"
              id="email_grid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
            />
          </div> */}
        </div>

        {/* Fields that span full width (if not in grid) */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Email address</label>
          <input
            type="email"
            id="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@company.com"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Password</label>
          <input
            type="password"
            id="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 font-inter">Confirm password</label>
          <input
            type="password"
            id="confirm_password"
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 font-inter">Register as</label>
          <select name='role' value={formData.role} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkViolet focus:border-darkViolet block w-full p-2.5" >
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              name="agreed" checked={formData.agreed} onChange={handleChange}
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
            I agree with the <a href="#" className="text-darkViolet hover:underline">terms and conditions</a>.
          </label>
          {errors.agreed && <p className="text-red-500 text-sm ml-2">{errors.agreed}</p>}
        </div>

        <button
          type="submit"
          className="text-darkViolet hover:text-violet bg-violet hover:bg-darkViolet w-full h-14 rounded-lg shadow-md font-bold text-lg transition duration-300"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;