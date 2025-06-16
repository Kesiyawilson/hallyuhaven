import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import './ProductItem.css'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    
    // Ensure we always use the first image if multiple exist
    const productImage = Array.isArray(image) ? image[0] : image;

    return (
        <Link className='product-item-link' to={`/product/${id}`}>
            <div className='product-image-container'>
                <img 
                    className='product-image' 
                    src={productImage} 
                    alt={name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image'
                    }}
                />
            </div>
            <p className='product-name'>{name}</p>
            <p className='product-price'>{currency}{price.toFixed(2)}</p>
        </Link>
    )
}

export default ProductItem

