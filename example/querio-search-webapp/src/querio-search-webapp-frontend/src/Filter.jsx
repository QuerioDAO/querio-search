// Filter.jsx

import React, { useState, useRef, useEffect } from "react";
import { Chains } from "../../../../../index.js";
import FilterIcon from "./assets/FilterIcon.svg";

export default function Filter({ onSelectedChain }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (index) => {
    setMenuOpen(false);
    onSelectedChain(index + 1);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) 
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", marginLeft: "auto", marginRight: "1rem" }}>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        style={{
          background: "transparent",
          border: "none",
          padding: 8,
          cursor: "pointer",
        }}
      >
        <img
          src={FilterIcon}
          alt="Filter Menu"
          style={{ width: "1.3rem", display: "block" }}
        />
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)", // just below the button
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            zIndex: 999,
            minWidth: "8rem",
          }}
        >
          {Chains.map((chain, index) => (
            <div
              key={index}
              onClick={() => handleMenuItemClick(index)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            >

              <span>{chain.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
