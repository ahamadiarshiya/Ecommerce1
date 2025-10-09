import "../styles/MyCart.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function MyCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=194");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const filteredProducts = response.data.products.filter(product =>
          cartItems.some(cartItem => cartItem.id === product.id)
        );

        setCartProducts(filteredProducts);

        const quantitiesFromStorage = {};
        cartItems.forEach(item => {
          quantitiesFromStorage[item.id] = Number(item.quantity) || 1;
        });
        setQuantities(quantitiesFromStorage);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const totalPrice = cartProducts.reduce((total, product) => {
      const quantity = quantities[product.id] || 1;
      return total + product.price * quantity;
    }, 0);

    setTotal(totalPrice);
  }, [cartProducts, quantities]);

const handleIncrement = (productId) => {
  setQuantities((prev) => {
    const newQuantity = (prev[productId] || 1) + 1;

    const cartItemsStr = localStorage.getItem('cartItems');
    const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

    const productIndex = cartItems.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartItems[productIndex].quantity = newQuantity;
    } else {
      cartItems.push({ id: productId, quantity: newQuantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return {
      ...prev,
      [productId]: newQuantity,
    };
  });
};


  const handleDecrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  const handleDelete = (productId) => {
    const updatedCart = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedCart);

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];
    setQuantities(updatedQuantities);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  if (cartProducts.length === 0) {
    return <div className="no-products"><b>No items found in your cart.</b></div>
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="cart">
          <p>Products</p>
          <p className="heading-qty">Qty</p>
          <p className="heading-price">Price</p>
        </div>
      </div>

      <div className="cart-body">
        {cartProducts.map((product) => {
          const quantity = quantities[product.id] || 1;
          return (
            <div key={product.id} className="carts-list">
              <div
                className="cart-info"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="product-image">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    height="150px"
                    width="150px"
                  />
                </div>
                <p className="title">{product.title}</p>
              </div>

              <div className="cart-count">
                <button
                  className="quantity"
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
                <div className="quantity-value">{quantity}</div>
                <button
                  className="quantity"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
              </div>

              <div className="price-trash-container">
                <p>&#8377;{Math.round(product.price * quantity)}</p>
                <FaTrash
                  className="remove-icon"
                  onClick={() => handleDelete(product.id)}
                />
              </div>
            </div>
          );
        })}

        <p className="total">Total: &#8377;{Math.round(total)}</p>

        <div className="checkout-button">
          <button className="final-buttons" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
          <button
            className="final-buttons"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
