const express = require("express")
const router = express.Router();

const { register, login } = require('../controllers/userController');
const { products, singleProduct } = require('../controllers/productsController');
const { cartProducts, addTOCart } = require('../controllers/cartController')


router.post('/user/register', register);
router.post('/user/login', login);
router.get('/products/all-products', products);
router.get('/products/singleProduct/:id', singleProduct)
router.get('/cart/cartProducts', cartProducts);
router.get('/cart/cartProducts', addTOCart)


module.exports = router;