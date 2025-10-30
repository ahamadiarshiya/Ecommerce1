const express = require("express")
const router = express.Router();

const { register, login } = require('../controllers/userController');
const { products, singleProduct } = require('../controllers/productsController');
const { cartProducts, addTOCart } = require('../controllers/cartController')
const { addShippingInfo } = require("../controllers/shippingController")

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/products/all-products', products);
router.get('/products/singleProduct/:id', singleProduct)
router.get('/cart/cartProducts', cartProducts);
router.get('/cart/cartProducts', addTOCart);
router.get('/shippng/addShippingInfo', addShippingInfo)


module.exports = router;