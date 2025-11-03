const express = require("express")
const router = express.Router();

const { register, login } = require('../controllers/userController');
const { products, singleProduct } = require('../controllers/productsController');
const { cartProducts, addToCart } = require('../controllers/cartController')
const { addShippingInfo } = require("../controllers/shippingController")

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/products/all-products', products);
router.get('/products/singleProduct/:id', singleProduct)
router.get('/cart/cartProducts', cartProducts);
router.post('/cart/addToCart', addToCart);
router.post('/shipping/addShippingInfo', addShippingInfo)


module.exports = router;