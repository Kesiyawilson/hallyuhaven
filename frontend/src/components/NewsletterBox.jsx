import React from 'react'
import './NewsletterBox.css'

const NewsletterBox = () => {
    const onSubmitHandler=()=>{
        event.preventDefault();
    }
  return (
    <div className="newsletter-box-container">
      <p className="newsletter-box-text">
        Subscribe now & get 20% off
      </p>
      <p className="newsletter-subtext">
        Stay in the loop for exclusive offers, K-pop merch drops, and fan-favorite collections delivered right to your inbox.
      </p>
      <form onSubmit={onSubmitHandler} className="newsletter-form">
        <input
          className="newsletter-input"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="newsletter-button">
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox



