import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = '$';
    const delivery_fee = 10; // Example shipping fee. Adjust as needed.
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');

    const addToCart = async (itemId, size) => {
        // Find the product by itemId
        const product = products.find(p => p._id === itemId);

        // Defensive: if product not found, show error
        if (!product) {
            toast.error("Product not found");
            return;
        }

        // Check if product has sizes array and it has items
        const hasSizes = product.sizes && product.sizes.length > 0;

        if (hasSizes && !size) {
            toast.error('Select Product Size');
            return;
        }

        setCartItems(prev => {
            const newCart = { ...prev };
            if (!newCart[itemId]) newCart[itemId] = {};
            // For products without sizes, use a default key like 'default'
            const sizeKey = hasSizes ? size : 'default';
            newCart[itemId][sizeKey] = (newCart[itemId][sizeKey] || 0) + 1;
            console.log("Cart after addToCart:", newCart);
            return newCart;
        });

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size: hasSizes ? size : null },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // --- MODIFIED: getCartAmount function for robustness and debugging ---
    const getCartAmount = () => {
        if (products.length === 0) {
            return 0;
        }
        let totalAmount = 0;
        console.log("Starting getCartAmount calculation...");
        for (const itemId in cartItems) {
            // Ensure the item ID exists in cartItems and has quantities
            if (Object.keys(cartItems[itemId]).length === 0) {
                console.log(`Skipping empty item ID: ${itemId}`);
                continue;
            }

            const product = products.find((p) => p._id === itemId);

            if (!product) {
                console.warn(`Product with ID '${itemId}' not found in 'products' array. Skipping.`);
                continue; // Skip this cart item if its corresponding product data is missing
            }

            // Ensure product.price is a valid number
            const productPrice = Number(product.price);
            if (isNaN(productPrice)) {
                console.error(`Invalid price for product ID '${itemId}': '${product.price}'. Skipping.`);
                continue; // Skip if price is not a valid number
            }

            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];

                // Ensure quantity is a valid number and greater than 0
                const numericQuantity = Number(quantity);
                if (isNaN(numericQuantity) || numericQuantity <= 0) {
                    console.log(`Skipping item ID '${itemId}', size '${size}' due to invalid or zero quantity: ${quantity}`);
                    continue;
                }

                totalAmount += productPrice * numericQuantity;
                console.log(`  - Adding ${productPrice} * ${numericQuantity} for item ID: ${itemId}, size: ${size}. Current total: ${totalAmount}`);
            }
        }
        console.log("Final Cart Amount:", totalAmount);
        return totalAmount;
    };
    // ------------------------------------------------------------------

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products,
        currency,
        cartItems,
        addToCart,
        getCartCount,
        search,
        setSearch,
        updateQuantity,
        getCartAmount,
        setCartItems,
        delivery_fee,
        navigate,
        setToken,
        token,
        backendUrl,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;

