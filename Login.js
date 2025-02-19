

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// const Login = () => {
//   const [form, setForm] = useState({
//     username: '',
//     password: ''
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/login', form);
//       setSuccess('Login successful!');
//       setError('');
//       // Navigate to the profile page after successful login
//       navigate('/home');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'An error occurred');
//     }
//   };

//   return (
//     <div className="signin-page">
//       <div className="form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="text" 
//             name="username" 
//             placeholder="Username" 
//             value={form.username} 
//             onChange={handleChange} 
//             required 
//           />
//           <div className="password-container">
//             <input 
//               type={passwordVisible ? "text" : "password"} 
//               name="password" 
//               placeholder="Password" 
//               value={form.password} 
//               onChange={handleChange} 
//               required 
//             />
//             <i 
//               className={`eye-icon ${passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
//               onClick={() => setPasswordVisible(!passwordVisible)} 
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           {success && <p className="success">{success}</p>}
//           <button type="submit">Login</button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      const { token, username, userId } = res.data;

      // Save token, username, and userId to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);
      console.log(token)
      console.log(userId)
      setSuccess('Login successful!');
      setError('');

      // Navigate to the home page after successful login
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };


  return (
    <div className="signin-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={form.username} 
            onChange={handleChange} 
            required 
          />
          <div className="password-container">
            <input 
              type={passwordVisible ? "text" : "password"} 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
            />
            <i 
              className={`eye-icon ${passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'}`} 
              onClick={() => setPasswordVisible(!passwordVisible)} 
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



