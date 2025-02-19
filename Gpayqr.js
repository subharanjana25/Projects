import React from 'react';

const Gpayqr = () => {
    const handlePayment = () => {
        console.log("Processing payment...");
        alert("Payment Successful!");
    };

    return (
        <div className="gpay-container">
            <style>
                {`
                    .gpay-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background-color: #fff;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        margin: 20px auto;
                    }

                    .gpay-title {
                        font-size: 1.5rem;
                        color: #4285f4; /* Google Blue */
                        margin-bottom: 20px;
                    }

                    .gpay-button {
                        padding: 10px 20px;
                        font-size: 1rem;
                        background-color: #4285f4; /* Google Blue */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .gpay-button:hover {
                        background-color: #357ae8; /* Darker Blue */
                    }

                    .gpay-logo {
                        width: 100px;
                        margin-bottom: 20px;
                    }

                    .qr-code {
                        margin: 20px 0;
                        width: 150px; /* Adjust as needed */
                        height: 150px; /* Adjust as needed */
                    }
                `}
            </style>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/29/Google_Pay_logo.png" 
                alt="Google Pay Logo" 
                className="gpay-logo"
            />
            <h2 className="gpay-title">Pay with Google Pay</h2>
            {/* QR Code Image */}
            <img 
                src="https://api.qrserver.com/v1/create-qr-code/?data=YourPaymentDataHere&size=150x150" 
                alt="QR Code for Payment" 
                className="qr-code"
            />
            <button className="gpay-button" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default Gpayqr;
