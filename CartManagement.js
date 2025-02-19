

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import './CartManagement.css';  // Import CSS file for styling

const CartManagement = ({ setCartItemCount }) => {  // Pass function to set item count
    const { updateQuantity, removeFromCart } = useContext(CartContext);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);  // State for total items
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                toast.info('Please log in to view your cart');
                return;
            }
            const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
                headers: { 'x-auth-token': token }
            });
            const cartItems = response.data.items;

            const updatedCartItems = await Promise.all(cartItems.map(async (item) => {
                let productResponse;
                if (item.category === 'electronics') {
                    productResponse = await axios.get(`http://localhost:5000/api/electronics/${item.productId}`, {
                        headers: { 'x-auth-token': token }
                    });
                } else if (item.category === 'furniture') {
                    productResponse = await axios.get(`http://localhost:5000/api/furnitures/${item.productId}`, {
                        headers: { 'x-auth-token': token }
                    });
                }
                return { ...item, product: productResponse.data };
            }));

            setCart(updatedCartItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);



  const handleCheckout = () => {
    navigate('/orders'); // Navigate to the orders page
  };

    // Calculate total amount and total items whenever cart is updated
    useEffect(() => {
        const calculateTotal = () => {
            const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            const itemCount = cart.reduce((count, item) => count + item.quantity, 0);  // Calculate total items

            setTotalAmount(total);
            setTotalItems(itemCount);
            setCartItemCount(itemCount);  // Pass total items to parent (or cart icon component)
        };

        calculateTotal();
    }, [cart]);

    const handleQuantityChange = async (productId, category, action) => {
        const item = cart.find(item => item.productId === productId && item.category === category);
        if (!item) return;

        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity < 1) return;

        try {
            await updateQuantity(productId, newQuantity, category);
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity. Please try again.');
        }
    };

    const handleRemove = async (productId, category) => {
        try {
            await removeFromCart(productId, category);
            toast.info('Removed successfully')
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-grid">
                    {cart.map(item => (
                        <div key={item.productId} className="cart-item">
                            <div className="image-slideshow">
                                {item.product.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Product image ${index + 1}`} />
                                ))}
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">{item.product.name}</h3>
                                <p><b>Price: </b> Rs.{item.product.price}</p>
                                <p> <b>Category: </b>{item.category}</p>

                                <div className="bottom-right-controls">
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item.productId, item.category, 'decrease')}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.productId, item.category, 'increase')}>+</button>
                                    </div>
                                    <button className="remove-button" onClick={() => handleRemove(item.productId, item.category)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="total-amount">
                        <h3>Total Amount: Rs.{totalAmount}</h3>
                        <button className="checkout-button" onClick={handleCheckout}>
                        Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartManagement;


