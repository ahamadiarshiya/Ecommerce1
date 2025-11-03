const Products = require("../models/products");

const products = async (req, res) => {
  try {
    const data = await Products.findAll();
    return res
      .status(200)
      .json({
        success: true,
        data: data,
        message: "Data Retrieved Successfully",
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id)
      return res.status(400).json({ success: false, message: "Invalid ID" });

    const product = await Products.findOne({ where: { id } });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        data: product,
        message: "Data received successfully",
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  products,
  singleProduct,
};
