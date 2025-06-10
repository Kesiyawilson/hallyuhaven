import React, { createContext, useState } from 'react';
import { products } from "../assets/assets";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const [cartItems, setCartItems] = useState({});
    // --- FIX: Add search state here ---
    const [search, setSearch] = useState(''); // Initialize search state
    // ---------------------------------

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

    // You can add a getCartCount function here if you don't have it yet
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

    const formattedProducts = products.map(product => ({
        ...product,
        image: Array.isArray(product.image) ? product.image : [product.image]
    }));

    const value = {
        products: formattedProducts,
        currency,
        cartItems,
        addToCart,
        getCartCount, // Make getCartCount available via context
        // --- FIX: Provide search and setSearch via context ---
        search,    // Shorthand for search: search
        setSearch,
        updateQuantity // Shorthand for setSearch: setSearch
        // ----------------------------------------------------
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;