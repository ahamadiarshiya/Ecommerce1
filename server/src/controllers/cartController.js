const Cart = require("../models/cart");
const Products = require("../models/product");



const cartProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Cart.findAll({ where: { userId } });
    let cartProductsList = [];
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    for (const item of data) {
      const product = await Products.findOne({ where: { id: item.productId } });
      if (product) cartProductsList.push(product);
    }
    return res
      .status(200)
      .json({
        success: true,
        data: cartProductsList,
        message: "Data retrieved successfully",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or productId" });
    }


    if (quantity < 1) {
  return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
}

    

    const existing = await Cart.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res
        .status(200)
        .json({
          success: true,
          data: existing,
          message: "Cart updated successfully",
        });
    }

    const cartProduct = await Cart.create({
      userId,
      productId,
      quantity,
    });

    return res.status(201).json({
      success: true,
      data: cartProduct,
      message: "Cart Product added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  cartProducts,
  addToCart,
};
