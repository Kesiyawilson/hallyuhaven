import React, { useState } from "react";
import { X } from "lucide-react";

const SearchBar = ({ products }) => {
  const [query, setQuery] = useState("");

  const clearQuery = () => setQuery("");

  // Filter products based on the query (example filter)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="relative flex items-center">
        {/* Search icon image inside the input box */}
        <img
          src="/search_icon.png"
          alt="Search"
          className="absolute left-3 h-5 w-5 pointer-events-none"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm shadow-sm
            focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        {/* Cross icon outside the input box to clear */}
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="ml-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Example: Show filtered product names */}
      <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id} className="text-gray-700 py-1 border-b last:border-b-0">
              {product.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;





