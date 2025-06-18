import React, { useContext ,useState,useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import './Orders.css'; 
import axios from 'axios';

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setorderData]=useState([])
  const loadOrderData=async ()=>{
    try {
      if(!token){
         return null
      }
      const response=await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date 
            allOrdersItem.push(item)
          })
        })
      setorderData(allOrdersItem.reverse())
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    loadOrderData() 
  }, [token])
  

  return (
    <div className="orders-container">
      <Title text1="MY" text2="ORDERS" />
      <div className="orders-list">
        {orderData.map((item, index) => (
          <div key={index} className="order-box">
            <div className="order-left">
              <img src={item.image[0]} alt="product" className="order-image" />
            </div>
            <div className="order-info">
              <p><strong>{item.name}</strong></p>
              <p>Price: <span>{currency}{item.price}</span></p>
              <p>Size: <span>{item.size}</span></p>
              <p>Quantity: <span>{item.quantity}</span></p>
              <p>Payment: <span>{item.paymentMethod}</span></p>
              <p>Purchase Date: <span>{new Date(item.date).toDateString()}</span></p>
              <div className="order-status">
                <span className="green-dot" /> {item.status}
              </div>
              <button onClick={loadOrderData} className="track-order-btn">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
