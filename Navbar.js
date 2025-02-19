

// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cart } = useContext(CartContext);  // Access the cart context
 

   const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home">
          <img src="lakshmilogo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/furniture">Furniture</Link>
        <Link to="/electronics">Electronics</Link>
        <a href="/AboutStore">About Store</a>
        <a href="/contactus"> Contact & FeedBack</a>
        <a href="/service">Services</a>
      </div>
      <div className="navbar-right">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
        {/* Cart Icon with Item Count */}
        <div className="cart-icon-wrapper">
          <Link to="/cartmanagement" className="icon-link">
            <FaShoppingCart className="icon" />
            {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
          </Link>
        </div>

        {/* Profile Icon */}
        <Link to="/profile" className="icon-link">
          <FaUser className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

