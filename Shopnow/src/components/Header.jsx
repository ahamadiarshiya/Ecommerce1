import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import { AiOutlineLogout } from "react-icons/ai";
import { FaUser } from 'react-icons/fa'

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });
  }, []);


  const goToProducts = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const cartInfo = JSON.parse(localStorage.getItem('cartItems')) || []
  const count = cartInfo.length || 0;

  const location = useLocation()

  const isCartPage = location.pathname === "/cart"



  return (
    <header className="header">
      <div className="header-hero">

        <div className="header-left" onClick={goToProducts}>
          <img src="src/data/logo.png" alt="logo" className="logo-img" />
          <h1 className="brand-name">Cartify</h1>
        </div>


        <nav className="nav-links">
          <span onClick={goToProducts}>Products</span>


          <div
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="dropdown-title">Categories ▾</span>
            {showDropdown && Array.isArray(categories) && categories.length > 0 && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={goToProducts}>
                  All Products
                </div>
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="dropdown-item"
                    onClick={() => {

                      const categoryParam = cat.slug || cat;
                      navigate(`/products?category=${categoryParam}`);
                      setShowDropdown(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {cat.name || cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>


        <div className="header-right">
          {!isCartPage && (
          <Link to="/cart" className="cart-container">
            <img src="src/data/shopping-cart.png" alt="cartlogo" className="icon-img" />
            <span className="cart-label">Cart({count})</span>
          </Link>
          )}

          <div className='profile-icon'> <FaUser /> </div> 

          <div className='logout-container'>
            <span className="logout-icon"><Link to="/login">  <AiOutlineLogout /> </Link> </span>
            <Link to="/login" className="logout">Logout</Link>
          </div>

        </div>
      </div>
    </header>
  );
}
