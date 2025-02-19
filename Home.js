
// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleFurnitureClick = () => {
    navigate('/furniture'); // Navigate to the furniture page
  };

  const handleElectronicsClick = () => {
    navigate('/electronics'); // Navigate to the electronics page
  };

  return (
    <div className="home">
      {/* First Section: Text on Left, Image on Right */}
      <div className="home-container">
        <div className="content-section">
          <div className="text-content">
          <h1 className="fade-in">Lakshmi Furniture and Metal Marts</h1>
            <h2 className="fade-in">Modern Solutions for Stylish Spaces</h2>
            <p className="fade-in-delay">
              Find everything you need to create a home that reflects your taste and personality.
              Discover the perfect blend of comfort, style, and functionality today.
            </p>
            <div className="statistics fade-in-delay">
              <div>
                <h2>600+</h2>
                <p>Unique Styles</p>
              </div>
              <div>
                <h2>5000+</h2>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="image-section">
          <img
            src="https://plus.unsplash.com/premium_photo-1676968002767-1f6a09891350?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Stylish Living Room"
            className="slide-in-right"
          />
        </div>
        
      </div>

      {/* Second Section: Product Cards */}
      <div className="image-container">
        <img
          src="https://m.media-amazon.com/images/I/51TVFcB1c1L.jpg"
          alt="Chair"
          className="background-image"
        />
       
      </div>

      <div className="product-container">
        <div className="product-card" onClick={handleFurnitureClick}>
          <img
            src="https://media3.bosch-home.com/Images/900x1200/25204057_OffersHomeSetup_WebsiteTeaserBanners_900x12001.webp"
            alt="Product 1"
          />
          <div className="overlay">
            <div className="text">View Products</div>
          </div>
          <div className="description">
            <b>0% Effort. 100% Drying with Dryers.</b>
          </div>
        </div>

        <div className="product-card" onClick={handleFurnitureClick}>
          <img
            src="https://media3.bosch-home.com/Images/900x1200/25204058_Dishwasher_WebsiteTeaserBanners_900x12002.webp"
            alt="Product 2"
          />
          <div className="overlay">
            <div className="text">View Products</div>
          </div>
          <div className="description">
            <b>0% Effort. 100% Cleaning vessels</b>
          </div>
        </div>

        <div className="product-card" onClick={handleFurnitureClick}>
          <img
            src="https://media3.bosch-home.com/Images/900x1200/25204110_RefrigeratorRange_WebsiteTeaserBanners_900x120013.webp"
            alt="Product 3"
          />
          <div className="overlay">
            <div className="text">View Products</div>
          </div>
          <div className="description">
            <b>Freshness Meets Flexibility with Refrigerators.</b>
          </div>
        </div>

        <div className="product-card" onClick={handleElectronicsClick}>
          <img
            src="https://plus.unsplash.com/premium_photo-1678074057896-eee996d4a23e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlfGVufDB8fDB8fHww"
            alt="Product 4"
          />
          <div className="overlay">
            <div className="text">View Products</div>
          </div>
          <div className="description">
            <b>Furnish your house with our products</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
