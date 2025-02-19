




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../components/Order.css';

// const Order = () => {
//     const [cart, setCart] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [shippingInfo, setShippingInfo] = useState({
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//         pincode: '',
//         landmark: '',
//     });
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [gstAmount, setGstAmount] = useState(0);
//     const [discountAmount, setDiscountAmount] = useState(0); // New state for discount
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState(''); // To track payment method
//     const navigate = useNavigate();

//     // Fetch cart items
//     const fetchCart = async () => {
//         const userId = localStorage.getItem('userId');
//         const token = localStorage.getItem('token');
//         if (!userId || !token) {
//             toast.info('Please log in to view your cart');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
//                 headers: { 'x-auth-token': token }
//             });
//             setCart(response.data.items);
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//             toast.warn('Loading cart');
//         }
//     };

//     // Fetch product details based on cart items
//     const fetchProductDetails = async () => {
//         const productDetails = await Promise.all(cart.map(async (item) => {
//             let productData;
//             try {
//                 const productId = item.productId; // Assuming productId is a string that needs to be converted to ObjectId

//                 if (item.category === 'furniture') {
//                     const response = await axios.get(`http://localhost:5000/api/furnitures/${productId}`);
//                     productData = response.data;
//                 } else if (item.category === 'electronics') {
//                     const response = await axios.get(`http://localhost:5000/api/electronics/${productId}`);
//                     productData = response.data;
//                 }
//             } catch (error) {
//                 console.error(`Error fetching product with ID ${item.productId}:`, error);
//             }
//             return { ...item, product: productData };
//         }));
//         setProducts(productDetails);
//     };

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     useEffect(() => {
//         if (cart.length > 0) {
//             fetchProductDetails();
//         }
//     }, [cart]);

//     // Calculate total amount, GST, discount, and final amount
//     useEffect(() => {
//         const total = products.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
//         setTotalAmount(total);

//         const gst = parseFloat((total * 0.18).toFixed(2)); // Rounded GST
//         setGstAmount(gst);

//         const discount = total > 50000 ? parseFloat((total * 0.10).toFixed(2)) : 0; // Rounded discount
//         setDiscountAmount(discount); // Set discount amount state
        
//         const final = parseFloat((total + gst - discount).toFixed(2)); // Final amount rounded
//         setFinalAmount(final);
//     }, [products]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingInfo({ ...shippingInfo, [name]: value });
//     };

//     const handleCheckout = async () => {
//         const username = localStorage.getItem('username'); // Assuming you store the username in local storage
//         const orderData = {
//             username,
//             products: products.map(item => ({
//                 productId: item.productId, // Keep as is, will be converted in the backend
//                 name: item.product.name,
//                 price: item.product.price,
//                 quantity: item.quantity,
//             })),
//             shippingInfo: {
//                 ...shippingInfo,
//             },
//             paymentMethod,
//             paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed', // Set as needed
//             totalAmount: finalAmount, // Sending final amount including GST and discount
//             expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // One week from now
//         };

//         try {
//             await axios.post('http://localhost:5000/api/orders', orderData);
//             toast.success('Order placed successfully!');
//             if (paymentMethod === 'GPay') {
//                 // Redirect to GPay payment page (handle this as per your implementation)
//                 navigate('/gpay');
//             } else {
//                 toast.success('Order placed');
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//             toast.error('Order placement failed');
//         }
//     };

//     return (
//         <div className="order-container">
//             {/* Order Summary Section */}
//             <div className="order-details">
//                 <h2>Order Summary</h2>
//                 {products.map(item => (
//                     <div key={item.productId} className="order-item">
//                         {item.product && (
//                             <>
//                                 <img src={item.product.images[0]} alt={item.product.name} />
//                                 <div className="item-info">
//                                     <h3>{item.product.name}</h3>
//                                     <p>Price: Rs.{item.product.price}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 ))}
//                 <h3>Total Amount: Rs.{totalAmount}</h3>
//                 <h3>GST (18%): Rs.{gstAmount}</h3>
//                 <h3>Discount: Rs.{discountAmount > 0 ? `-${discountAmount}` : 'No discount applicable'}</h3>
//                 <h3>Final Amount: Rs.{finalAmount}</h3>
//             </div>

//             {/* Address Section */}
//             <div className="shipping-info">
//                 <h2>Shipping Details</h2>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={shippingInfo.name}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={shippingInfo.address}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={shippingInfo.phone}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={shippingInfo.email}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={shippingInfo.pincode}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="landmark"
//                     placeholder="Landmark"
//                     value={shippingInfo.landmark}
//                     onChange={handleInputChange}
//                 />
//                 <h3>Expected Delivery Date: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h3>
//             </div>

//             {/* Payment Details Section */}
//             <div className="payment-details">
//                 <h2>Payment Details</h2>
//                 <h3>Select Payment Method</h3>
//                 <div className="payment-methods">
//                     <label>
//                         <input
//                             type="radio"
//                             name="paymentMethod"
//                             value="Credit Card"
//                             checked={paymentMethod === 'Credit Card'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         Credit Card
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             name="paymentMethod"
//                             value="GPay"
//                             checked={paymentMethod === 'GPay'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         GPay
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             name="paymentMethod"
//                             value="Cash on Delivery"
//                             checked={paymentMethod === 'Cash on Delivery'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         Cash on Delivery
//                     </label>
//                 </div>
//             </div>

//             {/* Checkout Button */}
//             <div className="checkout-button">
//                 <button onClick={handleCheckout}>Place Order</button>
//             </div>
//         </div>
//     );
// };

// export default Order;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../components/Order.css';

// const Order = () => {
//     const [cart, setCart] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const [shippingInfo, setShippingInfo] = useState({
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//         pincode: '',
//         landmark: '',
//     });
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [gstAmount, setGstAmount] = useState(0);
//     const [discountAmount, setDiscountAmount] = useState(0); // New state for discount
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState(''); // To track payment method
//     const [errors, setErrors] = useState({ email: '', phone: '', pincode: '' }); // Updated to include pincode error
//     const navigate = useNavigate();

//     // Regex for validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
//     const phoneRegex = /^[0-9]{10}$/;
//     const pincodeRegex = /^[0-9]{6}$/; // 6 digit pincode validation

//     // Fetch cart items
//     const fetchCart = async () => {
//         const userId = localStorage.getItem('userId');
//         const token = localStorage.getItem('token');
//         if (!userId || !token) {
//             toast.info('Please log in to view your cart');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
//                 headers: { 'x-auth-token': token }
//             });
//             setCart(response.data.items);
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//             toast.warn('Loading cart');
//         }
//     };

//     // Fetch product details based on cart items
//     const fetchProductDetails = async () => {
//         const productDetails = await Promise.all(cart.map(async (item) => {
//             let productData;
//             try {
//                 const productId = item.productId;

//                 if (item.category === 'furniture') {
//                     const response = await axios.get(`http://localhost:5000/api/furnitures/${productId}`);
//                     productData = response.data;
//                 } else if (item.category === 'electronics') {
//                     const response = await axios.get(`http://localhost:5000/api/electronics/${productId}`);
//                     productData = response.data;
//                 }
//             } catch (error) {
//                 console.error(`Error fetching product with ID ${item.productId}:`, error);
//             }
//             return { ...item, product: productData };
//         }));
//         setProducts(productDetails);
//     };

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     useEffect(() => {
//         if (cart.length > 0) {
//             fetchProductDetails();
//         }
//     }, [cart]);

//     // Calculate total amount, GST, discount, and final amount
//     useEffect(() => {
//         const total = products.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
//         setTotalAmount(total);

//         const gst = parseFloat((total * 0.18).toFixed(2)); // Rounded GST
//         setGstAmount(gst);

//         const discount = total > 50000 ? parseFloat((total * 0.10).toFixed(2)) : 0; // Rounded discount
//         setDiscountAmount(discount); // Set discount amount state
        
//         const final = parseFloat((total + gst - discount).toFixed(2)); // Final amount rounded
//         setFinalAmount(final);
//     }, [products]);

//     // Validation logic on blur (field loses focus)
//     const handleInputBlur = (e) => {
//         const { name, value } = e.target;
//         let error = '';

//         if (name === 'email') {
//             if (!emailRegex.test(value)) {
//                 error = 'Invalid email format';
//             }
//         }

//         if (name === 'phone') {
//             if (!phoneRegex.test(value)) {
//                 error = 'Phone number must be 10 digits';
//             }
//         }

//         if (name === 'pincode') {
//             if (!pincodeRegex.test(value)) {
//                 error = 'Pincode must be 6 digits';
//             }
//         }

//         setErrors({ ...errors, [name]: error });
//     };

//     // General input change handler
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingInfo({ ...shippingInfo, [name]: value });
//     };

//     const handleCheckout = async () => {
//         // Validate before checkout
//         if (errors.email || errors.phone || errors.pincode) {
//             toast.error('Please fix the errors before submitting');
//             return;
//         }

//         const username = localStorage.getItem('username');
//         const orderData = {
//             username,
//             products: products.map(item => ({
//                 productId: item.productId,
//                 name: item.product.name,
//                 price: item.product.price,
//                 quantity: item.quantity,
//             })),
//             shippingInfo: {
//                 ...shippingInfo,
//             },
//             paymentMethod,
//             paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
//             totalAmount: finalAmount,
//             expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
//         };

//         try {
//             await axios.post('http://localhost:5000/api/orders', orderData);
//             if (paymentMethod === 'GPay') {
//                 navigate('/qr-scanner'); // Navigate to QR Scanner Page
//             } else {
//                 toast.success('Order placed successfully!'); // Only show once
//                 navigate('/order-confirmation', { state: { message: 'Your order has been successfully placed! Confirmation sent to your email.' } });
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//             toast.error('Order placement failed');
//         }
//     };

//     return (
//         <div className="order-container">
//             {/* Order Summary Section */}
//             <div className="order-details">
//                 <h2>Order Summary</h2>
//                 {products.map(item => (
//                     <div key={item.productId} className="order-item">
//                         {item.product && (
//                             <>
//                                 <img src={item.product.images[0]} alt={item.product.name} />
//                                 <div className="item-info">
//                                     <h3>{item.product.name}</h3>
//                                     <p>Price: Rs.{item.product.price}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 ))}
//                 <h3>Total Amount: Rs.{totalAmount}</h3>
//                 <h3>GST (18%): Rs.{gstAmount}</h3>
//                 <h3>Discount: Rs.{discountAmount > 0 ? `-${discountAmount}` : 'No discount applicable'}</h3>
//                 <h3>Final Amount: Rs.{finalAmount}</h3>
//             </div>

//             {/* Address Section */}
//             <div className="shipping-info">
//                 <h2>Shipping Details</h2>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={shippingInfo.name}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={shippingInfo.address}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={shippingInfo.phone}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur} // Validation happens on blur
//                 />
//                 {errors.phone && <span className="error">{errors.phone}</span>}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={shippingInfo.email}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur} // Validation happens on blur
//                 />
//                 {errors.email && <span className="error">{errors.email}</span>}
//                 <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={shippingInfo.pincode}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur} // Validation happens on blur
//                 />
//                 {errors.pincode && <span className="error">{errors.pincode}</span>}
//                 <input
//                     type="text"
//                     name="landmark"
//                     placeholder="Landmark"
//                     value={shippingInfo.landmark}
//                     onChange={handleInputChange}
//                 />
//             </div>

            // {/* Payment Section */}
            // <div className="payment-method">
            //     <h2>Payment Method</h2>
            //     <label>
            //         <input
            //             type="radio"
            //             value="Cash on Delivery"
            //             checked={paymentMethod === 'Cash on Delivery'}
            //             onChange={() => setPaymentMethod('Cash on Delivery')}
            //         />
            //         Cash on Delivery
            //     </label>
            //     <label>
            //         <input
            //             type="radio"
            //             value="GPay"
            //             checked={paymentMethod === 'GPay'}
            //             onChange={() => setPaymentMethod('GPay')}
            //         />
            //         GPay
            //     </label>
            // </div>
            // <br/>
            // <br/>

//             {/* Checkout Button */}
//             <button className="checkout-button" onClick={handleCheckout}>Place Order</button>
//         </div>
//     );
// };

// export default Order;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../components/Order.css';
// import Spinner from './Spinner'; // Import the Spinner component

// const Order = () => {
//     const [cart, setCart] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false); // State for loading

//     const [shippingInfo, setShippingInfo] = useState({
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//         pincode: '',
//         landmark: '',
//     });
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [gstAmount, setGstAmount] = useState(0);
//     const [discountAmount, setDiscountAmount] = useState(0);
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [errors, setErrors] = useState({ email: '', phone: '', pincode: '' });
//     const navigate = useNavigate();

//     // Regex for validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
//     const phoneRegex = /^[0-9]{10}$/;
//     const pincodeRegex = /^[0-9]{6}$/;

//     // Fetch cart items
//     const fetchCart = async () => {
//         const userId = localStorage.getItem('userId');
//         const token = localStorage.getItem('token');
//         if (!userId || !token) {
//             toast.info('Please log in to view your cart');
//             return;
//         }

//         try {
//             const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
//                 headers: { 'x-auth-token': token }
//             });
//             setCart(response.data.items);
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//             toast.warn('Loading cart');
//         }
//     };

//     // Fetch product details based on cart items
//     const fetchProductDetails = async () => {
//         const productDetails = await Promise.all(cart.map(async (item) => {
//             let productData;
//             try {
//                 const productId = item.productId;

//                 if (item.category === 'furniture') {
//                     const response = await axios.get(`http://localhost:5000/api/furnitures/${productId}`);
//                     productData = response.data;
//                 } else if (item.category === 'electronics') {
//                     const response = await axios.get(`http://localhost:5000/api/electronics/${productId}`);
//                     productData = response.data;
//                 }
//             } catch (error) {
//                 console.error(`Error fetching product with ID ${item.productId}:`, error);
//             }
//             return { ...item, product: productData };
//         }));
//         setProducts(productDetails);
//     };

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     useEffect(() => {
//         if (cart.length > 0) {
//             fetchProductDetails();
//         }
//     }, [cart]);

//     // Calculate total amount, GST, discount, and final amount
//     useEffect(() => {
//         const total = products.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
//         setTotalAmount(total);

//         const gst = parseFloat((total * 0.18).toFixed(2));
//         setGstAmount(gst);

//         const discount = total > 50000 ? parseFloat((total * 0.10).toFixed(2)) : 0;
//         setDiscountAmount(discount);
        
//         const final = parseFloat((total + gst - discount).toFixed(2));
//         setFinalAmount(final);
//     }, [products]);

//     // Validation logic on blur
//     const handleInputBlur = (e) => {
//         const { name, value } = e.target;
//         let error = '';

//         if (name === 'email') {
//             if (!emailRegex.test(value)) {
//                 error = 'Invalid email format';
//             }
//         }

//         if (name === 'phone') {
//             if (!phoneRegex.test(value)) {
//                 error = 'Phone number must be 10 digits';
//             }
//         }

//         if (name === 'pincode') {
//             if (!pincodeRegex.test(value)) {
//                 error = 'Pincode must be 6 digits';
//             }
//         }

//         setErrors({ ...errors, [name]: error });
//     };

//     // General input change handler
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingInfo({ ...shippingInfo, [name]: value });
//     };

//     const handleCheckout = async () => {
//         if (errors.email || errors.phone || errors.pincode) {
//             toast.error('Please fix the errors before submitting');
//             return;
//         }

//         setLoading(true); // Start loading
//         const username = localStorage.getItem('username');
//         const orderData = {
//             username,
//             products: products.map(item => ({
//                 productId: item.productId,
//                 name: item.product.name,
//                 price: item.product.price,
//                 quantity: item.quantity,
//             })),
//             shippingInfo: {
//                 ...shippingInfo,
//             },
//             paymentMethod,
//             paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
//             totalAmount: finalAmount,
//             expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
//         };

//         try {
//             await axios.post('http://localhost:5000/api/orders', orderData);
//             if (paymentMethod === 'GPay') {
//                 navigate('/qr-scanner');
//             } else {
//                 toast.success('Order placed successfully!');
//                 navigate('/order-confirmation', { state: { message: 'Your order has been successfully placed! Confirmation sent to your email.' } });
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//             toast.error('Order placement failed');
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     return (
//         <div className="order-container">
//             {/* Show spinner if loading */}
//             {loading ? (
//                 <Spinner />
//             ) : (
//                 <>
//                     {/* Order Summary Section */}
//                     <div className="order-details">
//                         <h2>Order Summary</h2>
//                         {products.map(item => (
//                             <div key={item.productId} className="order-item">
//                                 {item.product && (
//                                     <>
//                                         <img src={item.product.images[0]} alt={item.product.name} />
//                                         <div className="item-info">
//                                             <h3>{item.product.name}</h3>
//                                             <p>Price: Rs.{item.product.price}</p>
//                                             <p>Quantity: {item.quantity}</p>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         ))}
//                         <h3>Total Amount: Rs.{totalAmount}</h3>
//                         <h3>GST (18%): Rs.{gstAmount}</h3>
//                         <h3>Discount: Rs.{discountAmount > 0 ? `-${discountAmount}` : 'No discount applicable'}</h3>
//                         <h3>Final Amount: Rs.{finalAmount}</h3>
//                     </div>

//                     {/* Address Section */}
//                     <div className="shipping-info">
//                         <h2>Shipping Details</h2>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={shippingInfo.name}
//                             onChange={handleInputChange}
//                         />
//                         <input
//                             type="text"
//                             name="address"
//                             placeholder="Address"
//                             value={shippingInfo.address}
//                             onChange={handleInputChange}
//                         />
//                         <input
//                             type="text"
//                             name="phone"
//                             placeholder="Phone Number"
//                             value={shippingInfo.phone}
//                             onChange={handleInputChange}
//                             onBlur={handleInputBlur}
//                         />
//                         {errors.phone && <span className="error">{errors.phone}</span>}
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={shippingInfo.email}
//                             onChange={handleInputChange}
//                             onBlur={handleInputBlur}
//                         />
//                         {errors.email && <span className="error">{errors.email}</span>}
//                         <input
//                             type="text"
//                             name="pincode"
//                             placeholder="Pincode"
//                             value={shippingInfo.pincode}
//                             onChange={handleInputChange}
//                             onBlur={handleInputBlur}
//                         />
//                         {errors.pincode && <span className="error">{errors.pincode}</span>}
//                         <input
//                             type="text"
//                             name="landmark"
//                             placeholder="Landmark"
//                             value={shippingInfo.landmark}
//                             onChange={handleInputChange}
//                         />
//                     </div>

                    
//             {/* Payment Section */}
//             <div className="payment-method">
//                 <h2>Payment Method</h2>
//                 <label>
//                     <input
//                         type="radio"
//                         value="Cash on Delivery"
//                         checked={paymentMethod === 'Cash on Delivery'}
//                         onChange={() => setPaymentMethod('Cash on Delivery')}
//                     />
//                     Cash on Delivery
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         value="GPay"
//                         checked={paymentMethod === 'GPay'}
//                         onChange={() => setPaymentMethod('GPay')}
//                     />
//                     GPay
//                 </label>
//             </div>
//             <br/>
//             <br/>


//                     {/* Place Order Button */}
//                     <button className='checkout-button'onClick={handleCheckout}>Place Order</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Order;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../components/Order.css';
import Spinner from './Spinner'; // Import the Spinner component

const Order = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading
    const [useSignupInfo, setUseSignupInfo] = useState(false); // State to track if user wants to use signup info

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        pincode: '',
        landmark: '',
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({ email: '', phone: '', pincode: '' });
    const navigate = useNavigate();

    // Regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    // Fetch cart items
    const fetchCart = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (!userId || !token) {
            toast.info('Please log in to view your cart');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
                headers: { 'x-auth-token': token }
            });
            setCart(response.data.items);
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.warn('Loading cart');
        }
    };

    // Fetch product details based on cart items
    const fetchProductDetails = async () => {
        const productDetails = await Promise.all(cart.map(async (item) => {
            let productData;
            try {
                const productId = item.productId;

                if (item.category === 'furniture') {
                    const response = await axios.get(`http://localhost:5000/api/furnitures/${productId}`);
                    productData = response.data;
                } else if (item.category === 'electronics') {
                    const response = await axios.get(`http://localhost:5000/api/electronics/${productId}`);
                    productData = response.data;
                }
            } catch (error) {
                console.error(`Error fetching product with ID ${item.productId}:`, error);
            }
            return { ...item, product: productData };
        }));
        setProducts(productDetails);
    };

    // Fetch the current user details for autofill
    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: { 'x-auth-token': token }
            });
            const { username, email, phoneNumber, address } = response.data;

            if (useSignupInfo) {
                setShippingInfo({
                    name: username,
                    address: address,
                    phone: phoneNumber,
                    email: email,
                    pincode: '',
                    landmark: '',
                });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            fetchProductDetails();
        }
    }, [cart]);

    // Autofill shipping info if the checkbox is selected
    useEffect(() => {
        if (useSignupInfo) {
            fetchUserDetails();  // Autofill with signup info
        } else {
            // Clear shipping info when checkbox is unchecked
            setShippingInfo({
                name: '',
                address: '',
                phone: '',
                email: '',
                pincode: '',
                landmark: '',
            });
        }
    }, [useSignupInfo]);
    // Calculate total amount, GST, discount, and final amount
    useEffect(() => {
        const total = products.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        setTotalAmount(total);

        const gst = parseFloat((total * 0.18).toFixed(2));
        setGstAmount(gst);

        const discount = total > 50000 ? parseFloat((total * 0.10).toFixed(2)) : 0;
        setDiscountAmount(discount);
        
        const final = parseFloat((total + gst - discount).toFixed(2));
        setFinalAmount(final);
    }, [products]);

    // Validation logic on blur
    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let error = '';

        if (name === 'email') {
            if (!emailRegex.test(value)) {
                error = 'Invalid email format';
            }
        }

        if (name === 'phone') {
            if (!phoneRegex.test(value)) {
                error = 'Phone number must be 10 digits';
            }
        }

        if (name === 'pincode') {
            if (!pincodeRegex.test(value)) {
                error = 'Pincode must be 6 digits';
            }
        }

        setErrors({ ...errors, [name]: error });
    };

    // General input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handleCheckout = async () => {
        if (errors.email || errors.phone || errors.pincode) {
            toast.error('Please fix the errors before submitting');
            return;
        }

        setLoading(true); // Start loading
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const orderData = {
            username,
            products: products.map(item => ({
                productId: item.productId,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            })),
            shippingInfo: {
                ...shippingInfo,
            },
            paymentMethod,
            paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
            totalAmount: finalAmount,
            expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        };

        try {
            // Place the order
            await axios.post('http://localhost:5000/api/orders', orderData);
            
            // After placing the order, delete the cart
            await axios.delete(`http://localhost:5000/api/cart/${userId}`);

            if (paymentMethod === 'GPay') {
                navigate('/qr-scanner');
            } else {
                toast.success('Order placed successfully!');
                navigate('/order-confirmation', { state: { message: 'Your order has been successfully placed! Confirmation sent to your email.' } });
            }
        } catch (error) {
            console.error('Error placing order or deleting cart:', error);
            toast.error('Order placement or cart clearing failed');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="order-container">
            {/* Show spinner if loading */}
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {/* Order Summary Section */}
                    <div className="order-details">
                        <h2>Order Summary</h2>
                        {products.map(item => (
                            <div key={item.productId} className="order-item">
                                {item.product && (
                                    <>
                                        <img src={item.product.images[0]} alt={item.product.name} />
                                        <div className="item-info">
                                            <h3>{item.product.name}</h3>
                                            <p>Price: Rs.{item.product.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        <h3>Total Amount: Rs.{totalAmount}</h3>
                        <h3>GST (18%): Rs.{gstAmount}</h3>
                        <h3>Discount: Rs.{discountAmount > 0 ? `-${discountAmount}` : 'No discount applicable'}</h3>
                        <h3>Final Amount: Rs.{finalAmount}</h3>
                    </div>

                    {/* Address Section */}
                    <div className="shipping-info">
                        <h2>Shipping Details</h2>
                        <label>
                            <input
                                type="checkbox"
                                checked={useSignupInfo}
                                onChange={() => setUseSignupInfo(!useSignupInfo)}
                            />
                            Default Shipping Info
                        </label>
                        <form>
                            <input type="text" name="name" placeholder="Name" value={shippingInfo.name} onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email" value={shippingInfo.email} onChange={handleInputChange} onBlur={handleInputBlur} required />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <input type="text" name="phone" placeholder="Phone" value={shippingInfo.phone} onChange={handleInputChange} onBlur={handleInputBlur} required />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                            <input type="text" name="address" placeholder="Address" value={shippingInfo.address} onChange={handleInputChange} required />
                            <input type="text" name="pincode" placeholder="Pincode" value={shippingInfo.pincode} onChange={handleInputChange} onBlur={handleInputBlur} required />
                            {errors.pincode && <p className="error">{errors.pincode}</p>}
                            <input type="text" name="landmark" placeholder="Landmark" value={shippingInfo.landmark} onChange={handleInputChange} />
                        </form>
                    </div>

                    {/* Payment Method Section */}
                    <div className="payment-method">
                        <h2>Payment Method</h2>
                        <div>
                            <input type="radio" id="cod" name="paymentMethod" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                        <br/>
                        
                        <div>
                            <input type="radio" id="gpay" name="paymentMethod" value="GPay" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="gpay">GPay</label>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="checkout-button" onClick={handleCheckout}>Place Order</button>
                </>
            )}

        <div className="order-note">
        <p>Note: Once the order placed,There is no cancellation of orders.<br></br>if any inquiries contact us</p>
       </div>
        </div>
    );
};

export default Order;
