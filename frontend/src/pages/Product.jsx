import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Product.css';
import { assets } from "../assets/assets";
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const[size,setSize]=useState('') // size state is managed

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // Modified handleAddToCart to pass the hasSizes flag
  const handleAddToCart = () => {
    // Determine if the current product has sizes by checking productData.sizes
    const productHasSizes = productData.sizes && productData.sizes.length > 0;

    // Call addToCart, passing the hasSizes flag
    addToCart(productData._id, size, productHasSizes);
  };


  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 product-section">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Thumbnails + Enlarged image + Title */}
        <div className="product-display-wrapper">
          {/* Thumbnails */}
          <div className="product-thumbs-container">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className={`product-thumb ${image === item ? 'selected-thumb' : ''}`}
                alt=""
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          {/* Enlarged Image */}
          <div className="product-main-image-container">
            <img src={image} alt="" />
          </div>

          {/* Title to the right of the image */}
          <div className="product-title-container">
          <h2 className="product-title" style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
  {productData.name}
</h2>

<div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
            
             
          </div>
          <p style={{ fontSize: '2rem', fontWeight: '500', marginTop: '1.25rem' }}>{currency}{productData.price}</p>
          <p style={{ color: '#6B7280', width: '80%', marginTop: '1.25rem' }}>
            {productData.description}
          </p>
          {productData.sizes && productData.sizes.length > 0 ? ( 
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className="size-selector">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`size-button ${item === size ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
) : ( // Optional: If no sizes, you might want to reset the size state or ensure it's empty
  null
)}
          <button onClick={handleAddToCart} className="add-to-cart-button">ADD TO CART</button>
          <hr className="product-divider" />
          <div className="light-gray-text">
            <p>100% original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>


          </div>
        </div>
        
      </div>
      {/*display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;



