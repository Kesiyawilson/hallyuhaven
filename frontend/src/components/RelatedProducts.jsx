import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './RelatedProducts.css'; // <-- Add this line
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

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



