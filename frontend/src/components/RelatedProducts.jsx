import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './RelatedProducts.css';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      
 
      productsCopy = productsCopy.filter((item) => item._id !== currentProductId);
      
 
      let exactMatches = productsCopy.filter((item) =>
        category === item.category && subCategory === item.subCategory
      );
      
  
      if (exactMatches.length >= 5) {
        setRelated(exactMatches.slice(0, 5));
        return;
      }
      
     
      let categoryMatches = productsCopy.filter((item) =>
        category === item.category && subCategory !== item.subCategory
      );
      
 
      if (exactMatches.length >= 3) {
        setRelated(exactMatches.slice(0, 5));
      }
     
      else if (exactMatches.length > 0) {
        let combinedResults = [
          ...exactMatches,
          ...categoryMatches.slice(0, 5 - exactMatches.length)
        ];
        setRelated(combinedResults);
      }
 
      else {
        setRelated(categoryMatches.slice(0, 5));
      }
    }
  }, [products, category, subCategory, currentProductId]);

 
  if (related.length === 0) {
    return null;
  }

  return (
    <div className="related-products-section">
      <div className="related-title">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className="related-products-grid">
        {related.map((item, index) => (
          <div className="related-product-card" key={index}>
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;