import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import './Title.css'

const LatestCollections = () => {
  const { products } = useContext(ShopContext)

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="latest-collections-description">
          Lorem ipsum dolor sit amet. Ab molestiae nihil qui adipisci dolore aut officiis voluptatibus eos impedit fugiat. Sit odit assumenda aut consequatur asperiores.
        </p>
        {/* Product grid will go here */}
      </div>
    </div>
  )
}

export default LatestCollections

