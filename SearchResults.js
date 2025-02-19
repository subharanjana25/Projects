
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState({ furniture: [], electronics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching search results');
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset image index for slideshow
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>

      <div className="results-category">
        <h2>Furniture</h2>
        {results.furniture.length > 0 ? (
          <div className="grid-container">
            {results.furniture.map(item => (
              <div key={item._id} className="grid-item">
                <h3>{item.name}</h3>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  onClick={() => handleImageClick(item)}
                />
                <p>Price: ₹{item.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No furniture found.</p>
        )}
      </div>

      <div className="results-category">
        <h2>Electronics</h2>
        {results.electronics.length > 0 ? (
          <div className="grid-container">
            {results.electronics.map(item => (
              <div key={item._id} className="grid-item">
                <h3>{item.name}</h3>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  onClick={() => handleImageClick(item)}
                />
                <p>Price: ₹{item.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No electronics found.</p>
        )}
      </div>

      {selectedProduct && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close-button" onClick={closeModal}>&times;</button>
      <h2 className="modal-title">{selectedProduct.name}</h2>
      <div className="slideshow">
        <button className="slideshow-button" onClick={handlePrevImage}>&#10094;</button>
        <img
          src={selectedProduct.images[currentImageIndex]}
          alt={selectedProduct.name}
          className="modal-image"
        />
        <button className="slideshow-button" onClick={handleNextImage}>&#10095;</button>
      </div>
      <p className="price">Price: ₹{selectedProduct.price}</p>
      <p className="category">Category: {selectedProduct.category}</p>
      <p className="description-modal">Description: {selectedProduct.description}</p>
      {selectedProduct.brand && <p>Brand: {selectedProduct.brand}</p>}
      {selectedProduct.model && <p>Model: {selectedProduct.model}</p>}
      {selectedProduct.color && <p>Color: {selectedProduct.color}</p>}
      {selectedProduct.specifications && <p>Specifications: {selectedProduct.specifications}</p>}
      <button className="add-to-cart-button-modal">Add to Cart</button>
    </div>
  </div>
)}

    </div>
  );
};

export default SearchResults;
