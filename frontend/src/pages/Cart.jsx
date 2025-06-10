import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import './Cart.css';
import { assets } from '../assets/assets';

const Cart = () => {
  const{products,currency,cartItems,updateQuantity}=useContext(ShopContext);
  const[cartData,setCartData]=useState([]);

  useEffect(()=>{
    const tempData=[];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({
            _id:items,
            size:item,
            quantity:cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  },[cartItems])

  return (
    <div className='cart-page-container'>
      <div className='cart-title-wrapper'>
        <Title text1={'YOUR'} text2={'CART'} alignment="left" />
      </div>
      <div className='cart-items-wrapper'>
        {
          cartData.map((item,index)=>{
            const productData=products.find((product)=>product._id===item._id);
            if (!productData) return null;

            return(
              <div key={item._id + '-' + item.size} className='cart-item-display'>
                <img className='cart-product-image' src={productData.image[0]} alt={productData.name}/>
                <div className='cart-product-details'>
                  {/* --- CHANGE MADE HERE: Removed font-medium class --- */}
                  <p className='text-xs sm:text-lg'>{productData.name}</p>
                  {/* ---------------------------------------------------- */}
                  <div className='flex items-center gap-5'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
                <div className='cart-actions'>
                  <input onChange={(e)=>e.target.value===''||e.target.value==='0'?null:updateQuantity(item._id,item.size,Number(e.target.value))}className='cart-quantity-input' type="number" min={1} defaultValue={item.quantity}/>
                  <img onClick={()=>updateQuantity(item._id,item.size,0)}className='cart-bin-icon' src={assets.bin_icon} alt='Remove item'/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Cart