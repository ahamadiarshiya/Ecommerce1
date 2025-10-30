const express = require("express");
const db = require("../config/db");


const cartProducts = async(req,res) => {
    try{
    const  { userId } = req.params;
    const data = db.query(`SELECT * FROM cart WHERE userId = ${userId}`);
    let cartProducts = [];
    if(data.length === 0){
      return res.status(404).json({ success : false, message : "No data found"})
    }
    data.map((productId) => {
         const product = db.query(`SELECT * FROM products WHERE productId = ${productId}`);
         cartProducts.push(product)
    })
      return res.status(200).json({ success : true, data : cartProducts, message : "Data retrieved successfully" })
    }catch(error){
      return res.status(500).json({ success : false, message : error.message})
    }
  }


const addTOCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing userId or productId" });
    }
    const [result] = await db.query(
      'INSERT INTO cart (userId, productId) VALUES (?, ?)',
      [userId, productId]
    );

    return res.status(200).json({
      success: true,
      data: { insertId: result.insertId },
      message: "Product added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  cartProducts,
  addTOCart
}

