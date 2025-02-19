
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';
import { FaSnowflake, FaFire, FaChair, FaUtensils, FaCouch } from 'react-icons/fa';
import { MdLocalLaundryService } from 'react-icons/md';

const ServicePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Locations and their respective contact numbers
  const serviceLocations = [
    { location: 'Erode', contact: '+91 98765 43210' },
    { location: 'Salem', contact: '+91 87654 32109' },
    { location: 'Tirupur', contact: '+91 76543 21098' },
    { location: 'Coimbatore', contact: '+91 65432 10987' },
    { location: 'Perundurai', contact: '+91 54321 09876' },
    { location: 'Kangayam', contact: '+91 43210 98765' },
  ];

  return (
    <div className="service-page">
      <h1>Products Care and Services</h1>

      {/* Product Categories */}
      <div className="profile-actions">
        <button onClick={() => handleNavigation('/washing-machine')} className="action-btn">
          <MdLocalLaundryService className="cart-icon" /> Washing Machine
        </button>

        <button onClick={() => handleNavigation('/fridge')} className="action-btn">
          <FaSnowflake className="cart-icon" /> Fridge
        </button>

        <button onClick={() => handleNavigation('/ac')} className="action-btn">
          <FaFire className="cart-icon" /> Air Conditioner
        </button>

        <button onClick={() => handleNavigation('/dishwasher')} className="action-btn">
          <FaUtensils className="cart-icon" /> Dishwasher
        </button>

        <button onClick={() => handleNavigation('/furniturecare')} className="action-btn">
          <FaCouch className="cart-icon" /> Furniture
        </button>

        <button onClick={() => handleNavigation('/heater')} className="action-btn">
          <FaFire className="cart-icon" /> Heater
        </button>
      </div>

      {/* Contact Information */}
      <div className="service-locations">
        <h2>Contact Our Service Locations</h2>
        <div className="location-container">
          {serviceLocations.map((location, index) => (
            <div key={index} className="location-card">
              <span className="location-name">{location.location}</span>
              <span className="contact-number">{location.contact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
