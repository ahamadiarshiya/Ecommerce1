const express = require("express")
const router = express.Router();

const { register, login } = require('../controllers/users/userController');
const { products, singleProduct }  = require("../controllers/products/products")





router.post('/user/register', register);
router.post('/user/login', login);
router.get('/products/all-products', products);
router.get('/products/singleProduct/:id', singleProduct)


module.exports = router;