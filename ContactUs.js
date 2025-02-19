

import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          rating: 0,
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Lets connect with Lakshmi Furniture and Metal Marts</h2>
      <div className="contact-info">
        <div className="contact-item">
          <span role="img" aria-label="Location">📍</span>
          <p>2/161, Perundurai Main Road, Ellaimedu, Ingur, Perundurai, Erode-638052</p>
        </div>
        <div className="contact-item">
          <span role="img" aria-label="Email">📧</span>
          <p>lakshmiandfurniture@gmail.com</p>
        </div>
        <div className="contact-item">
          <span role="img" aria-label="Phone">📞</span>
          <p>Contact: 04294 299508 / 97888 89998</p>
        </div>
      </div>

      <h2>Feedback Form</h2>
      {submitted && <p className="success-message">Thank you for your feedback! We will get back to you soon.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        {/* Rating Section */}
        <div className="form-group">
          <label>Rating:</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={formData.rating >= star ? 'filled' : ''}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
