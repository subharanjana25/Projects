


import React from "react";
import "./AboutStore.css"; // External CSS for styling and animations

const AboutStore = () => {
  return (
    <div className="about-store">
      {/* Introduction Section */}
      <section className="intro-section">
        <h1 className="animated-title">Welcome to Lakshmi Furniture</h1>
        <p className="intro-text">
          Lakshmi Furniture brings you a curated selection of elegant and
          durable furniture to transform your living space. With our expert
          craftsmanship and 1k+ happy customers, we are committed to providing
          the best quality.
        </p>
      </section>

      {/* Furniture Showcase with Images and Animations */}
      <section className="furniture-gallery">
        <h2 className="section-title">Explore Our Furniture Collection</h2>
        <div className="gallery-container">
          <div className="furniture-item animated-fade">
            <img src='images1/furniture.png' alt="Elegant Sofa" className="furniture-img" />
            <p className="furniture-desc">Elegant Sofa - Perfect for Living Rooms</p>
          </div>
          <div className="furniture-item animated-fade">
            <img src='images1/furniture1.png' alt="Modern Dining Set" className="furniture-img" />
            <p className="furniture-desc">Modern Dining Set - Comfort and Style</p>
          </div>
          <div className="furniture-item animated-fade">
            <img src='images1/furniture2.png' alt="Wooden Coffee Table" className="furniture-img" />
            <p className="furniture-desc">Wooden Coffee Table - Contemporary Design</p>
          </div>
        </div>
      </section>

      {/* Store Video Section */}
      <section className="store-video-section">
        <h2 className="section-title">Take a Virtual Tour of Our Store</h2>
        <video className="store-video" autoPlay loop muted>
          <source src='videos/store.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Additional Stats Section (your extra content) */}
      <section className="about-store-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <span role="img" aria-label="Happy Customers">😊</span>
          </div>
          <div className="stat-info">
            <h3>1k+</h3>
            <p>Happy Customers</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <span role="img" aria-label="Partners">🤝</span>
          </div>
          <div className="stat-info">
            <h3>10+</h3>
            <p>Partners</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <span role="img" aria-label="Average Rating">⭐</span>
          </div>
          <div className="stat-info">
            <h3>4.5/5</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <span role="img" aria-label="Product Catalog">📑</span>
          </div>
          <div className="stat-info">
            <h3>3k+</h3>
            <p>Product Catalog</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <span role="img" aria-label="Seamless Delivery">🚚</span>
          </div>
          <div className="stat-info">
            <h3>Seamless Delivery</h3>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-us">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-container">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="250"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <span role="img" aria-label="Location">📍</span>
              <p>2/161, Perundurai Main Road, Ellaimedu,
                <br/> Ingur, Perundurai, Erode-638052</p>
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
        </div>
      </section>


      <section className="image-animation-section">
        <h2 className="section-title">Our Showrooms</h2>
        <div className="animated-images-container">
          <div className="animated-circle">
            <img src="images1/img8.png" alt="Showroom 1" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img6.png" alt="Showroom 2" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img5.png" alt="Showroom 3" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img1.png" alt="Showroom 3" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img2.png" alt="Showroom 3" className="circle-img" />
          </div>
         
          
        </div>
      </section>
      <section className="image-animation-section">
        <div className="animated-images-container">
      <div className="animated-circle">
            <img src="images1/img3.png" alt="Showroom 3" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img4.png" alt="Showroom 3" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img7.png" alt="Showroom 3" className="circle-img" />
          </div>
          <div className="animated-circle">
            <img src="images1/img9.png" alt="Showroom 3" className="circle-img" />
          </div>
          </div>
          </section>

    </div>
  );
};

export default AboutStore;
