import React, { createContext, useState } from 'react';
import { products } from "../assets/assets"; // Assuming 'products' is correctly imported and structured
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate=useNavigate();
    const currency = '$';
    const delivery_fee = 10; // Example shipping fee. Adjust as needed.

    const [cartItems, setCartItems] = useState({});
    const [search, setSearch] = useState('');

    const addToCart = (itemId, size, hasSizes) => {
        if (hasSizes && !size) {
            toast.error('Select Product Size');
            return;
        }

        setCartItems(prev => {
            const newCart = {...prev};
            if (!newCart[itemId]) newCart[itemId] = {};
            newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
            console.log("Cart after addToCart:", newCart);
            return newCart;
        });
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);
    }

    // --- MODIFIED: getCartAmount function for robustness and debugging ---
    const getCartAmount = () => {
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

    const formattedProducts = products.map(product => ({
        ...product,
        image: Array.isArray(product.image) ? product.image : [product.image]
    }));

    const value = {
        products: formattedProducts,
        currency,
        cartItems,
        addToCart,
        getCartCount,
        search,
        setSearch,
        updateQuantity,
        getCartAmount,
        delivery_fee,
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;