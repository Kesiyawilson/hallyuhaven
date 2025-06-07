import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import dropdownIcon from '../assets/dropdown_icon.png';
import './Collection.css';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const categories = {
    Men: ['Hoodies', 'T-Shirts', 'Varsityjacket', 'Bottomwear'],
    Women: ['Hoodies', 'T-Shirts', 'Tops', 'Bottomwear', 'Sweaters'],
    Accessories: ['Photocards', 'LightSticks', 'Key-Chains', 'Plushies'],
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowFilters(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchSubcategory =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(`${product.category}|${product.subCategory}`);
      return matchSubcategory;
    });

    if (sortOption === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'relevant') {
      filtered = [...filtered].sort(() => Math.random() - 0.5); // shuffle
    }

    setFilteredProducts(filtered);
  }, [selectedSubcategories, sortOption, products]);

  const toggleFilters = () => {
    if (isMobile) setShowFilters((prev) => !prev);
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubcategories((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((sub) => sub !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="collection-container">
      <div className="collection-layout">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-header" onClick={toggleFilters}>
            <p className="filter-title">FILTERS</p>
            {isMobile && (
              <img
                src={dropdownIcon}
                alt="Toggle"
                className={`dropdown-icon ${showFilters ? 'rotated' : ''}`}
              />
            )}
          </div>

          {showFilters && (
            <div className="filter-box">
              {Object.entries(categories).map(([categoryName, subCats]) => (
                <div key={categoryName} className="category-section">
                  <p className="category-heading">{categoryName}</p>
                  <div className="subcategory-list">
                    {subCats.map((subCat, index) => {
                      const combinedKey = `${categoryName}|${subCat}`;
                      return (
                        <label key={index} className="subcategory-item">
                          <input
                            type="checkbox"
                            value={combinedKey}
                            onChange={handleSubcategoryChange}
                            checked={selectedSubcategories.includes(combinedKey)}
                          />
                          <span>{subCat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="products-section">
          <div className="products-header">
            <div className="all-collections-wrapper">
              <p className="all-collections-title">ALL COLLECTIONS</p>
              <hr className="all-collections-line" />
            </div>
            <div className="sort-dropdown">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="relevant">Sort By: Relevant</option>
                <option value="lowToHigh">Sort By: Low to High</option>
                <option value="highToLow">Sort By: High to Low</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image[0]}
                />
              ))
            ) : (
              <p>No products match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;





