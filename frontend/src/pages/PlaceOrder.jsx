import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import Title from '../components/Title';
import './PlaceOrder.css';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
const PlaceOrder = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext)
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value 
    setFormData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }
      switch(selectedPaymentMethod){
        case 'cod':
           const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
           if(response.data.success){
            setCartItems({})
            navigate('/orders')
           }
           else{
            toast.error(response.data.message)
           }
        break;

        default:
           break
      }
    } catch (error) {
      
    }
  }
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <form onSubmit={onSubmitHandler} className='place-order-page-layout'>
      {/* Left: Delivery Form */}
      <div className='delivery-form-container'>
        <div className='delivery-title-wrapper'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} alignment="left" />
        </div>

        <div className='form-row'>
          <input required onChange={onChangeHandler} className='form-input' type='text' name='firstName' value={formData.firstName} placeholder='First name' />
          <input required onChange={onChangeHandler} className='form-input' type='text' name='lastName' value={formData.lastName} placeholder='Last name' />
        </div>

        <input required onChange={onChangeHandler} className='form-input' type='email' name='email' value={formData.email} placeholder='Email address' />
        <input required onChange={onChangeHandler} className='form-input' type='text' name='street' value={formData.street} placeholder='Street' />

        <div className='form-row'>
          <input required onChange={onChangeHandler} className='form-input' type='text' name='city' value={formData.city} placeholder='City' />
          <input required onChange={onChangeHandler} className='form-input' type='text' name='state' value={formData.state} placeholder='State' />
        </div>

        <div className='form-row'>
          <input required onChange={onChangeHandler} className='form-input' type='number' name='zipcode' value={formData.zipcode} placeholder='Zipcode' />
          <input required onChange={onChangeHandler} className='form-input' type='text' name='country' value={formData.country} placeholder='Country' />
        </div>

        <input required onChange={onChangeHandler} className='form-input' type='number' name='phone' value={formData.phone} placeholder='Phone' />
      </div>

      {/* Right: Cart & Paymentt */}
      <div className='right-column-wrapper'>
        <div className='cart-total-section-wrapper'>
          <CartTotal />
        </div>

        <div className='payment-method-section'>
          <div className='payment-method-title'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='payment-options-row'>
            {/* Stripe */}
            <label className='payment-option-box' htmlFor='stripe'>
              <input
                type='radio'
                id='stripe'
                name='paymentMethod'
                value='stripe'
                className='hidden-radio'
                checked={selectedPaymentMethod === 'stripe'}
                onChange={() => handlePaymentMethodChange('stripe')}
              />
              <div className='custom-radio-circle'></div>
              <img className='payment-option-logo' src={assets.stripe_logo} alt='Stripe' />
            </label>

            {/* Razorpay */}
            <label className='payment-option-box' htmlFor='razorpay'>
              <input
                type='radio'
                id='razorpay'
                name='paymentMethod'
                value='razorpay'
                className='hidden-radio'
                checked={selectedPaymentMethod === 'razorpay'}
                onChange={() => handlePaymentMethodChange('razorpay')}
              />
              <div className='custom-radio-circle'></div>
              <img className='payment-option-logo' src={assets.razorpay_logo} alt='Razorpay' />
            </label>

            {/* Cash on Delivery */}
            <label className='payment-option-box' htmlFor='cod'>
              <input
                type='radio'
                id='cod'
                name='paymentMethod'
                value='cod'
                className='hidden-radio'
                checked={selectedPaymentMethod === 'cod'}
                onChange={() => handlePaymentMethodChange('cod')}
              />
              <div className='custom-radio-circle'></div>
              <p className='payment-option-text'>CASH ON DELIVERY</p>
            </label>
          </div>

          {/* ✅ Place Order Button */}
          <button
          type='submit'
            className="place-order-button"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
