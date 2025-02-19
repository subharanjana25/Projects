

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Furniture.css';
import { toast } from 'react-toastify';

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/furnitures')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching furniture:', err));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowFullDescription(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.warn('Please log in to add items to the cart.');
      return;
    }

    axios.post(
      'http://localhost:5000/api/cart/add',
      { userId, productId, quantity: 1, category: 'furniture' }, // Correct category field
      {
        headers: { 'x-auth-token': token }
      }
    )
    .then(() => toast.success('Product added to cart!'))
    .catch((err) => {
      console.error('Error adding to cart:', err.message);
      toast.error('Failed to add product to cart. Please try again.');
    });
  };

  useEffect(() => {
    if (modalIsOpen) {
      const interval = setInterval(goToNextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [modalIsOpen, selectedProduct]);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product._id} className="product-card">
          <h3>{product.name}</h3>
          <div className="product-content">
            <div className="product-image" onClick={() => openModal(product)}>
              <img src={product.images[0]} alt={product.name} />
            </div>
            <div className="product-details">
              <p className='category'><b> Category : Furniture </b></p>
              <p className="price">Price: Rs.{product.price}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close-button">×</button>
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <div className="slideshow">
              <button onClick={goToPrevImage} className="slideshow-button">&lt;</button>
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.name}
                className="modal-image"
              />
              <button onClick={goToNextImage} className="slideshow-button">&gt;</button>
            </div>
            <p className="category"><b>Category:</b> {selectedProduct.category}</p>
            <p className="price"><b>Price:</b> Rs.{selectedProduct.price}</p>
            <p className="description-modal">
              {showFullDescription ? selectedProduct.description : `${selectedProduct.description.substring(0, 100)}...`}
              <button onClick={handleToggleDescription} className="view-more-less">
                {showFullDescription ? 'View Less' : 'View More'}
              </button>
            </p>
            <button onClick={() => handleAddToCart(selectedProduct._id)} className="add-to-cart-button-modal">Add to Cart</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Furniture;
