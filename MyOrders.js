


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MyOrders.css';  // Optional: add CSS for styling

// const MyOrders = () => {
//     const [currentOrders, setCurrentOrders] = useState([]);
//     const [pastOrders, setPastOrders] = useState([]);

//     // Fetch the user's orders from the backend
//     const fetchOrders = async () => {
//         try {
//             const username = localStorage.getItem('username');
//             const token = localStorage.getItem('token');
//             if (!username || !token) {
//                 return alert('Please log in to view your orders');
//             }

//             const response = await axios.get(`http://localhost:5000/api/orders/${username}`, {
//                 headers: { 'x-auth-token': token }
//             });

//             const allOrders = response.data.orders;

//             // Separate current and past orders based on delivery status
//             const current = allOrders.filter(order => order.deliveryStatus === 'Processing');
//             const past = allOrders.filter(order => order.deliveryStatus === 'Delivered');

//             setCurrentOrders(current);
//             setPastOrders(past);
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         }
//     };

//     // Fetch orders on component mount
//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     return (
//         <div className="my-orders-container">
//             <h2>My Orders</h2>

//             {/* Display Current Orders */}
//             <h3>Current Orders</h3>
//             {currentOrders.length === 0 ? (
//                 <p>No current orders.</p>
//             ) : (
//                 currentOrders.map((order, index) => (
//                     <div key={index} className="order-section">
//                         <h4>Order Placed: {new Date(order.createdAt).toLocaleDateString()}</h4>
//                         <div className="order-products">
//                             {order.products.map((item, idx) => (
//                                 <div key={idx} className="product-item">
//                                     <h5>{item.name || 'Product Name Unavailable'}</h5>
//                                     <p>Price: Rs. {item.price || 'Price Unavailable'}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                     {/* <p>Category: {item.category}</p>
//                                     <p>Brand: {item.brand || 'Brand Unavailable'}</p> */}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             )}

//             <hr />

//             {/* Display Past Orders */}
//             <h3>Deliered Orders</h3>
//             {pastOrders.length === 0 ? (
//                 <p>No past orders.</p>
//             ) : (
//                 pastOrders.map((order, index) => (
//                     <div key={index} className="order-section">
//                         <h4>Order Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</h4>
//                         <div className="order-products">
//                             {order.products.map((item, idx) => (
//                                 <div key={idx} className="product-item">
//                                     <h5>{item.name || 'Product Name Unavailable'}</h5>
//                                     <p>Price: Rs. {item.price || 'Price Unavailable'}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default MyOrders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';  // Optional: add CSS for styling

const MyOrders = () => {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

    // Fetch the user's orders from the backend
    const fetchOrders = async () => {
        try {
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token');
            if (!username || !token) {
                return alert('Please log in to view your orders');
            }

            const response = await axios.get(`http://localhost:5000/api/orders/${username}`, {
                headers: { 'x-auth-token': token }
            });

            const allOrders = response.data.orders;

            // Separate current and past orders based on delivery status
            const current = allOrders
                .filter(order => order.deliveryStatus === 'Processing')
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt, newest first

            const past = allOrders
                .filter(order => order.deliveryStatus === 'Delivered')
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort past orders similarly

            setCurrentOrders(current);
            setPastOrders(past);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>

            {/* Display Current Orders */}
            <h3>Current Orders</h3>
            {currentOrders.length === 0 ? (
                <p>No current orders.</p>
            ) : (
                currentOrders.map((order, index) => (
                    <div key={index} className="order-section">
                        <h4>Order Placed: {new Date(order.createdAt).toLocaleDateString()}</h4>
                        <div className="order-products">
                            {order.products.map((item, idx) => (
                                <div key={idx} className="product-item">
                                    <h5>{item.name || 'Product Name Unavailable'}</h5>
                                    <p>Price: Rs. {item.price || 'Price Unavailable'}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            <hr />

            {/* Display Past Orders */}
            <h3>Past Orders</h3>
            {pastOrders.length === 0 ? (
                <p>No past orders.</p>
            ) : (
                pastOrders.map((order, index) => (
                    <div key={index} className="order-section">
                        <h4>Order Delivered: {new Date(order.shippingInfo.deliveryDate).toLocaleDateString()}</h4>
                        <div className="order-products">
                            {order.products.map((item, idx) => (
                                <div key={idx} className="product-item">
                                    <h5>{item.name || 'Product Name Unavailable'}</h5>
                                    <p>Price: Rs. {item.price || 'Price Unavailable'}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Order Placed On:{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
