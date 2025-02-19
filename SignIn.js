// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './SignIn.css';

// const SignIn = () => {
//   const [form, setForm] = useState({
//     username: '',  // Changed from 'name' to 'username'
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',  // Added phoneNumber field
//     address: ''       // Added address field
//   });
  
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
//     return regex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validatePassword(form.password)) {
//       setError('Password must be 8-15 characters long, contain at least one number and one special character.');
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/signup', form);
//       setSuccess('Sign up successful!');
//       setError('');
//     } catch (err) {
//       setError(err.response.data.msg);
//     }
//   };

//   return (
//     <div className="signin-page">
//       <div className="form-container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="text" 
//             name="username"  // Changed from 'name' to 'username'
//             placeholder="Username"  // Updated placeholder to reflect the change
//             value={form.username}  // Changed from form.name to form.username
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="email" 
//             name="email" 
//             placeholder="Email address" 
//             value={form.email} 
//             onChange={handleChange} 
//             required 
//           />
//           <div className="password-container">
//             <input 
//               type={passwordVisible ? "text" : "password"} 
//               name="password" 
//               placeholder="Set Password" 
//               value={form.password} 
//               onChange={handleChange} 
//               required 
//             />
//             <i 
//               className={`eye-icon ${passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
//               onClick={() => setPasswordVisible(!passwordVisible)} 
//             />
//           </div>
//           <div className="password-container">
//             <input 
//               type={confirmPasswordVisible ? "text" : "password"} 
//               name="confirmPassword" 
//               placeholder="Confirm Password" 
//               value={form.confirmPassword} 
//               onChange={handleChange} 
//               required 
//             />
//             <i 
//               className={`eye-icon ${confirmPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
//               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
//             />
//           </div>
//           <input 
//             type="text" 
//             name="phoneNumber"  // Added phoneNumber field
//             placeholder="Phone Number" 
//             value={form.phoneNumber} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="address"  // Added address field
//             placeholder="Address" 
//             value={form.address} 
//             onChange={handleChange} 
//             required 
//           />
//           {error && <p className="error">{error}</p>}
//           {success && <p className="success">{success}</p>}
//           <button type="submit">Continue</button>
//         </form>
//         <p>
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: ''
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/; // Phone number must be exactly 10 digits
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Password validation
    if (!validatePassword(form.password)) {
      setError('Password must be 8-15 characters long, contain at least one number and one special character.');
      return;
    }
    
    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Phone number validation
    if (!validatePhoneNumber(form.phoneNumber)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signup', form);
      setSuccess('Sign up successful!');
      setError('');
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred. Please try again.'); // Handle user already exists error
    }
  };

  return (
    <div className="signin-page">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={form.username} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email address" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <div className="password-container">
            <input 
              type={passwordVisible ? "text" : "password"} 
              name="password" 
              placeholder="Set Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
            />
            <i 
              className={`eye-icon ${passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
              onClick={() => setPasswordVisible(!passwordVisible)} 
            />
          </div>
          <div className="password-container">
            <input 
              type={confirmPasswordVisible ? "text" : "password"} 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              required 
            />
            <i 
              className={`eye-icon ${confirmPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
            />
          </div>
          <input 
            type="text" 
            name="phoneNumber" 
            placeholder="Phone Number" 
            value={form.phoneNumber} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            value={form.address} 
            onChange={handleChange} 
            required 
          />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Continue</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
