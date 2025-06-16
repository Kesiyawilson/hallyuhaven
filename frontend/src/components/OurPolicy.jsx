import React from 'react'
import { assets } from '../assets/assets'
import './OurPolicy.css'

const OurPolicy = () => {
  return (
    <div className="our-policy-section">
      <div className="policy-card">
        <img src={assets.exchange_icon} alt="Exchange Icon" />
        <p className="policy-title">Easy Exchange Policy</p>
        <p className="policy-subtext">We offer hassle free exchange policy</p>
      </div>

      <div className="policy-card">
        <img src={assets.quality_icon} alt="Quality Icon" />
        <p className="policy-title">7 Days Return Policy</p>
        <p className="policy-subtext">We provide 7 days free return policy</p>
      </div>

      <div className="policy-card">
        <img src={assets.support_img} alt="Support Icon" />
        <p className="policy-title">Best Customer Support</p>
        <p className="policy-subtext">We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy




