
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [cartItemCount, setCartItemCount] = useState(0);  // State for cart item count
//     const [userId, setUserId] = useState(null);

//     // Fetch user ID and cart on mount
//     useEffect(() => {
//         const fetchUserId = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     console.error('No token found');
//                     return;
//                 }

//                 const response = await axios.get('http://localhost:5000/api/users/me', {
//                     headers: { 'x-auth-token': token }
//                 });

//                 const userId = response.data._id;
//                 setUserId(userId);
//                 fetchCart(userId);
//             } catch (error) {
//                 console.error('Error fetching user details:', error);
//             }
//         };

//         fetchUserId();
//     }, []);

//     const fetchCart = async (userId) => {
//         if (!userId) return;
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//             setCart(data.items);
//             calculateTotal(data.items);
//             calculateCartItemCount(data.items);  // Update cart item count
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//         }
//     };

//     const calculateTotal = (cart) => {
//         let total = 0;
//         cart.forEach(item => {
//             if (item.product && item.product.price) {
//                 total += item.quantity * item.product.price;
//             } else {
//                 console.log(item.product);
//                 console.log(total);
//                 console.error('Product or price is undefined for item:', item);
//             }
//         });
//         setTotalAmount(total);
//     };

//     // Function to calculate total cart item count
//     const calculateCartItemCount = (cart) => {
//         const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
//         setCartItemCount(itemCount);  // Update cart item count
//     };

//     // Add to cart and update count
//     const addToCart = async (productId, quantity, category) => {
//         if (!userId) return;
//         try {
//             const { data } = await axios.post('http://localhost:5000/api/cart/add', { userId, productId, quantity, category });
//             setCart(data.items);
//             calculateTotal(data.items);
//             calculateCartItemCount(data.items);  // Update cart item count
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     // Update quantity and count
//     const updateQuantity = async (productId, quantity, category) => {
//         if (!userId) return;
//         try {
//             const { data } = await axios.put('http://localhost:5000/api/cart/update', { userId, productId, quantity, category });
//             setCart(data.items);
//             calculateTotal(data.items);
//             calculateCartItemCount(data.items);  // Update cart item count
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//         }
//     };

//     // Remove from cart and update count
//     const removeFromCart = async (productId, category) => {
//         if (!userId) return;
//         try {
//             const { data } = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}/${category}`);
//             setCart(data.items);
//             calculateTotal(data.items);
//             calculateCartItemCount(data.items);  // Update cart item count
//         } catch (error) {
//             console.error('Error removing from cart:', error);
//         }
//     };

//     return (
//         <CartContext.Provider value={{
//             cart,
//             totalAmount,
//             cartItemCount,  // Provide the cart item count in context
//             addToCart,
//             updateQuantity,
//             removeFromCart
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0);  // State for cart item count
    const [userId, setUserId] = useState(null);

    // Fetch user ID and cart on mount
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { 'x-auth-token': token }
                });

                const userId = response.data._id;
                setUserId(userId);
                fetchCart(userId);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserId();
    }, []);

    // Fetch product details based on productId and category
    const fetchProductDetails = async (productId, category) => {
        try {
            let productResponse;
            if (category === 'electronics') {
                productResponse = await axios.get(`http://localhost:5000/api/electronics/${productId}`);
            } else if (category === 'furniture') {
                productResponse = await axios.get(`http://localhost:5000/api/furnitures/${productId}`);
            }
            return productResponse.data;
        } catch (error) {
            console.error(`Error fetching product details for ${productId}:`, error);
            return null;
        }
    };

    // Fetch cart items and add product details to each item
    const fetchCart = async (userId) => {
        if (!userId) return;
        try {
            const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
            
            const cartItemsWithDetails = await Promise.all(
                data.items.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId, item.category);
                    return {
                        ...item,
                        product: productDetails,
                    };
                })
            );
            setCart(cartItemsWithDetails);
            calculateTotal(cartItemsWithDetails);
            calculateCartItemCount(cartItemsWithDetails);  // Update cart item count
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Calculate total amount for the cart items
    const calculateTotal = (cart) => {
        let total = 0;
        cart.forEach(item => {
            if (item.product && item.product.price) {
                total += item.quantity * item.product.price;
            } else {
                console.error('Product or price is undefined for item:', item);
            }
        });
        setTotalAmount(total);
    };

    // Function to calculate total cart item count
    const calculateCartItemCount = (cart) => {
        const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
        setCartItemCount(itemCount);  // Update cart item count
    };

    // Add to cart and update count
    const addToCart = async (productId, quantity, category) => {
        if (!userId) return;
        try {
            const { data } = await axios.post('http://localhost:5000/api/cart/add', { userId, productId, quantity, category });
            const updatedCart = await Promise.all(
                data.items.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId, item.category);
                    return {
                        ...item,
                        product: productDetails,
                    };
                })
            );
            setCart(updatedCart);
            calculateTotal(updatedCart);
            calculateCartItemCount(updatedCart);  // Update cart item count
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Update quantity and count
    const updateQuantity = async (productId, quantity, category) => {
        if (!userId) return;
        try {
            const { data } = await axios.put('http://localhost:5000/api/cart/update', { userId, productId, quantity, category });
            const updatedCart = await Promise.all(
                data.items.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId, item.category);
                    return {
                        ...item,
                        product: productDetails,
                    };
                })
            );
            setCart(updatedCart);
            calculateTotal(updatedCart);
            calculateCartItemCount(updatedCart);  // Update cart item count
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Remove from cart and update count
    const removeFromCart = async (productId, category) => {
        if (!userId) return;
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}/${category}`);
            const updatedCart = await Promise.all(
                data.items.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId, item.category);
                    return {
                        ...item,
                        product: productDetails,
                    };
                })
            );
            setCart(updatedCart);
            calculateTotal(updatedCart);
            calculateCartItemCount(updatedCart);  // Update cart item count
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            totalAmount,
            cartItemCount,  // Provide the cart item count in context
            addToCart,
            updateQuantity,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
