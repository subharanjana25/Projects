// src/components/Footer.js
import React from 'react';
import { FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icon-gallery">
        <a href="https://www.instagram.com/lakshimi_and_co" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="mailto:lakshmiandfurniture@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope className="icon" />
        </a>
        <a href="https://maps.app.goo.gl/VM1iC2rXa4gCPYLY8" target="_blank" rel="noopener noreferrer">
          <FaMapMarkerAlt className="icon" />
        </a>
      </div>
      <div className="footer-copy">
        &copy; 2024 - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
