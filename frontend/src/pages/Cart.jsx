import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import './Cart.css';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="cart-page-container">
      <div className="cart-title-wrapper">
        <Title text1="YOUR" text2="CART" alignment="left" />
      </div>
      
      <div className="cart-items-wrapper">
        {cartData.map((item) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div key={item._id + '-' + item.size} className="cart-item-display">
              <img
                className="cart-product-image"
                src={productData.image[0]}
                alt={productData.name}
              />
              <div className="cart-product-details">
                <p className="product-name">{productData.name}</p>
                <div className="price-size">
                  <p>{currency}{productData.price}</p>
                  <p className="product-size">{item.size}</p>
                </div>
              </div>
              <div className="cart-actions">
                <input
                  type="number"
                  min="1"
                  defaultValue={item.quantity}
                  className="cart-quantity-input"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) updateQuantity(item._id, item.size, val);
                  }}
                />
                <img
                  src={assets.bin_icon}
                  alt="Remove item"
                  className="cart-bin-icon"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CartTotal placed normally, aligned to bottom-right */}
      <div className="cart-total-aligned">
        <CartTotal />
        <div className="checkout-button-wrapper">
          <button onClick={()=>navigate('/place-order')}className="checkout-button">PROCEED TO CHECKOUT</button>
        </div>
      </div>

    </div>
  );
};

export default Cart;


