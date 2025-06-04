import React, { createContext } from 'react';
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;

    // Make sure products are properly formatted
    const formattedProducts = products.map(product => ({
        ...product,
        // Ensure image is always an array
        image: Array.isArray(product.image) ? product.image : [product.image]
    }));

    const value = {
        products: formattedProducts,
        currency,
        delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;