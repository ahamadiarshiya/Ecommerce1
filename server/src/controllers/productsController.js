const express = require("express");
import db from "../config/db"


const products = async(req,res)=> {
    try{
       const data = db.query('SELECT * FROM products');
       return res.status(200).json({ success : true, data : data, message : "Data Retrieved Successfully"});
    }catch(err){
        return res.status(500).json({ success : false, message : "Internal server error"})
    }
}


const singleProduct = async(req,res) => {
    try{
        const id = req.params.id;
        const product = db.query(`SELECT * FROM products where id = ${id}`);
        return res.status(200).json({ success : true, data : product, message : "Data received successfully"})
    }catch(err){
        return res.status(500).json({ success : false, message : "Internal server error"})
    }
}



module.exports = {
    products,
    singleProduct
}