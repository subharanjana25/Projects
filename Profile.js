

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { FaShoppingCart, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaShoppingBasket } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', phoneNumber: '', address: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'x-auth-token': token }
        });

        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
        });
      } catch (error) {
        setError(error.response?.data?.msg || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/me', formData, {
        headers: { 'x-auth-token': token }
      });
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewCart = () => {
    navigate('/cartmanagement');
  };

  const handleMyOrders = () => {
    navigate('/myorders'); // Navigate to My Orders page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h1>{user?.username}</h1>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {editMode ? (
        <div className="profile-details">
          <div className="profile-item">
            <FaEnvelope className="profile-item-icon" />
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="profile-item">
            <FaPhone className="profile-item-icon" />
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="profile-item">
            <FaMapMarkerAlt className="profile-item-icon" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <button onClick={handleSave} className='save-btn'>Save</button>
        </div>
      ) : (
        <div className="profile-details">
          <div className="profile-item">
            <FaEnvelope className="profile-item-icon" />
            <p>{user.email}</p>
          </div>
          <div className="profile-item">
            <FaPhone className="profile-item-icon" />
            <p>{user.phoneNumber}</p>
          </div>
          <div className="profile-item">
            <FaMapMarkerAlt className="profile-item-icon" />
            <p>{user.address}</p>
          </div>
        </div>
      )}

      <div className="profile-actions">
        <button onClick={handleViewCart} className="action-btn">
          <FaShoppingCart className="cart-icon" /> View Cart
        </button>
        <button onClick={handleMyOrders} className="action-btn">
          <FaShoppingBasket className="cart-icon" /> View Orders
        </button> {/* New button for My Orders */}
      </div>
    </div>
  );
};

export default Profile;
