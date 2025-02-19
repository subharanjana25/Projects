import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirm = () => {
    const location = useLocation();
    const { state } = location;
    const confirmationMessage = state?.message || 'Your order has been placed successfully!';

    return (
        <div className="order-confirmation-container">
            <style>
                {`
                    .order-confirmation-container {
                        
                        padding: 20px;
                        text-align: center;
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        margin: 20px auto;
                        max-width: 400px;
                    }

                    .order-confirmation-container h2 {
                       
                        font-size: 2rem;
                        margin-bottom: 20px;
                        color: #28a745; /* Green */
                    }

                    .order-confirmation-container p {
                        font-size: 1.2rem;
                        margin: 10px 0;
                        color: #333;
                    }

                    .order-confirmation-container button {
                        padding: 10px 20px;
                        font-size: 1rem;
                        background-color: #28a745; /* Green */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .order-confirmation-container button:hover {
                        background-color: #218838; /* Darker Green */
                    }
                `}
            </style>
            <br/><br/><br/>
            <br/>
            <br/>
            <br/>
            <h2>Order Confirmation</h2>
            <p>{confirmationMessage}</p>
            <h3>Thank you for shopping with us!</h3>
            <p>If you have any questions, feel free to contact our customer service.</p>
            <button onClick={() => window.location.href = '/home'}>Go to Home</button>
        </div>
    );
};

export default OrderConfirm;
