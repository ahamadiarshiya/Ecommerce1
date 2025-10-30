const express = require("express");
const db = require("../config/db")


const addShippingInfo = () => {
   const data = req.body;
   try{
   const shipingAddress = db.query('INSERT INTO shipping(address) VALUES(?)[data.address]');
   return res.status(200).json({ success : true, data : shipingAddress, message : "Data saved successfully"})
   }catch(err){
    return res.status(500).json({ success : false, message : err.message })
   }
}




module.exports = {
    addShippingInfo
}