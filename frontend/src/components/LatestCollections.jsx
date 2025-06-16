import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import './LatestCollections.css'

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Sort by date (newest first) and take first 10
      const sortedProducts = [...products].sort((a, b) => b.date - a.date);
      setLatestProducts(sortedProducts.slice(0, 10));
    }
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="latest-collections-container">
        <div className="latest-collections-wrapper">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="no-products">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="latest-collections-container">
      <div className="latest-collections-wrapper">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="latest-collections-description">
          Discover our newest K-pop merchandise collection featuring your favorite artists!
        </p>
      
        <div className='latest-products-grid'>
          {latestProducts.map((item) => (
            <ProductItem 
              key={item._id} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestCollections
