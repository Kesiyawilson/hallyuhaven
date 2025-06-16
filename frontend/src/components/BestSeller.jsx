import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'; // You missed importing this
import './LatestCollections.css'; // Reusing the same CSS

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="latest-collections-container">
      <div className="latest-collections-wrapper">
        <Title text1="BEST" text2="SELLERS" />
        <p className="latest-collections-description">
          From cozy hoodies to adorable plushies and must-have lightsticks — explore the fan-favorite pieces everyone’s loving right now!
        </p>

        <div className='latest-products-grid'>
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;





