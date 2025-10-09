import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles/ProductList.css';
import { IoIosSearch } from "react-icons/io";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedIds, setAddedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const productsPerPage = 12;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const search = queryParams.get('search');

    let url = 'https://dummyjson.com/products?limit=100';
    if (category) url = `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const items = data.products || data;
        let filtered = items;

        if (search) {
          filtered = items.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(filtered);
        setCurrentPage(1);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setLoading(false); 
      });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const storeItems = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product.id);

    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    setAddedIds(prev => [...prev, product.id]);
  };

  if (loading) {
    return null; 
  }


    const handleSearch = e => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <div className="product-list">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <span className='search-icon'><IoIosSearch /></span>
          </form>
      {products.length === 0 ? (
        <h2 className="no-products">No products found.</h2>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image-container">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                    />
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">&#8377;{product.price}</p>
                </Link>
                <button
                  className="add-btn"
                  onClick={() => storeItems(product)}
                  disabled={addedIds.includes(product.id)}
                >
                  {addedIds.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
