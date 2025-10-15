import React, { useState, useRef, useEffect } from "react";
import "../styles/CustomDropdown.css";

const CustomDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const dropdownRef = useRef(null);

  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

 useEffect(() => {
    if (props.quantity !== undefined) {
      setSelected(props.quantity);
    }
  }, [props.quantity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSelect = (num) => {
    setSelected(num);
    setIsOpen(false);
    if (props.onQuantityChange) {
      props.onQuantityChange(num);
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected}</span>
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {numbers.map((num) => (
            <div
              key={num}
              className={`dropdown-item ${num === selected ? "selected" : ""}`}
              onClick={() => handleSelect(num)}
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
