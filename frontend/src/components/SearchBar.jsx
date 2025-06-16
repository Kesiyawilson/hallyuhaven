import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets"; // ✅ Make sure this path is correct

const SearchBar = ({ setIsSearchVisible }) => {
  const { search, setSearch } = useContext(ShopContext);

  const clearSearch = () => {
    setSearch("");
    setIsSearchVisible(false); // Hide search bar on close
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "15px 40px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid #ddd",
          borderRadius: "25px",
          padding: "8px 15px",
          position: "relative",
        }}
      >
        {/* Search icon inside input */}
        <img
          src={assets.search_icon}
          alt="Search"
          style={{
            position: "absolute",
            left: "15px",
            width: "16px",
            height: "16px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
            paddingLeft: "40px",
          }}
        />

        {/* Close (cross) button to the right */}
        <button
          onClick={clearSearch}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Close search"
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            style={{ width: "16px", height: "16px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;


