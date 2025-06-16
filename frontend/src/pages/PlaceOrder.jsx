import React, { useState } from 'react'; // Import useState
import Title from '../components/Title';
import './PlaceOrder.css'; // Ensure this CSS file is imported
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  // State to manage the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    // Main page layout container
    <div className='place-order-page-layout'> 
      
      {/* Left side: Delivery Information Form Container */}
      <div className='delivery-form-container'> 
        
        {/* Title Wrapper */}
        <div className='delivery-title-wrapper'> 
          <Title text1={'DELIVERY'} text2={'INFORMATION'} alignment="left" />
        </div>

        {/* First name & Last name (side-by-side row) */}
        <div className='form-row'> 
          <input className='form-input' type='text' placeholder='First name'/>
          <input className='form-input' type='text' placeholder='Last name'/>
        </div>

        {/* Email address (full width) */}
        <input className='form-input' type='email' placeholder='Email address'/>

        {/* Street (full width) */}
        <input className='form-input' type='text' placeholder='Street'/>

        {/* City & State (side-by-side row) */}
        <div className='form-row'> 
          <input className='form-input' type='text' placeholder='City'/>
          <input className='form-input' type='text' placeholder='State'/>
        </div>

        {/* Zipcode & Country (side-by-side row) */}
        <div className='form-row'> 
          <input className='form-input' type='number' placeholder='Zipcode'/>
          <input className='form-input' type='text' placeholder='Country'/>
        </div>

        {/* Phone (full width) */}
        <input className='form-input' type='number' placeholder='Phone'/>

      </div>

      {/* Right Column Wrapper - This div will contain both CartTotal and Payment Method */}
      <div className='right-column-wrapper'> 
        {/* Cart Totals Component */}
        <div className='cart-total-section-wrapper'> 
          <CartTotal/>
        </div>

        {/* Payment Method section */}
        <div className='payment-method-section'> 
          {/* Smaller Title for Payment Method */}
          <div className='payment-method-title'> {/* New class for smaller title */}
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
          </div>
          
          {/* Payment method selection options */}
          <div className='payment-options-row'> 
            {/* Stripe Option */}
            <label className='payment-option-box' htmlFor='stripe'>
              <input 
                type='radio' 
                id='stripe' 
                name='paymentMethod' 
                value='stripe' 
                className='hidden-radio' // Hide actual radio button
                checked={selectedPaymentMethod === 'stripe'}
                onChange={() => handlePaymentMethodChange('stripe')}
              />
              <div className='custom-radio-circle'></div> {/* Custom circle */}
              <img className='payment-option-logo' src={assets.stripe_logo} alt='Stripe'/>
            </label>

            {/* Razorpay Option */}
            <label className='payment-option-box' htmlFor='razorpay'>
              <input 
                type='radio' 
                id='razorpay' 
                name='paymentMethod' 
                value='razorpay' 
                className='hidden-radio' // Hide actual radio button
                checked={selectedPaymentMethod === 'razorpay'}
                onChange={() => handlePaymentMethodChange('razorpay')}
              />
              <div className='custom-radio-circle'></div> {/* Custom circle */}
              <img className='payment-option-logo' src={assets.razorpay_logo} alt='Razorpay'/>
            </label>

            {/* Cash on Delivery Option */}
            <label className='payment-option-box' htmlFor='cashOnDelivery'>
              <input 
                type='radio' 
                id='cashOnDelivery' 
                name='paymentMethod' 
                value='cashOnDelivery' 
                className='hidden-radio' // Hide actual radio button
                checked={selectedPaymentMethod === 'cashOnDelivery'}
                onChange={() => handlePaymentMethodChange('cashOnDelivery')}
              />
              <div className='custom-radio-circle'></div> {/* Custom circle */}
              <p className='payment-option-text'>CASH ON DELIVERY</p> {/* Use a specific class for text */}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;


