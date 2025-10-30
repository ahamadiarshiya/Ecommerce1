const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
import db from "../config/db"


const register = async(req,res)=> {
    try{
        const data = req.body;

        if(!data.name || !data.email || data.password || data.mobile){
            return res.status(401).json({ success : false, message : "Required fields missing"})
        }
     
            const hashPassword = await bcrypt.hash(data.password,saltRounds);
            data.password = hashPassword;
            const query = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    const values = [data.name, data.email, data.password];

    const [result] = await db.query(query, values);
        
        return res.status(200).json({ success : true, data : result, message : "User registered successfully"})
    }catch(err){
        return res.status(500).json({ success : false, message : err.message })
    }
}





const login = async(req,res) => {
    try{
        const data = req.body;
        if(!data.email || !data.password){
            return res.status(401).json({ success : false, message : "Invalid email or password" });
        }


        if(data.email){
            const query = 'SELECT * FROM users where email =  ?';
            const [rows] = db.query(query,[email])
        }if(rows.length == 0){
            return res.status(404).json({ success : false, message : "User not found , please register"})
        }

        const user = row[0];
        const isMatch = bcrypt.compare(data.password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid Credentials, Please check once"
            })
        }
        return res.status(200).json({ success : true, message : "Login Successfully"});
    }catch(err){
        return res.status(500).json({ success : false, message : "Internal server error"})
    }
}



module.exports = {
    register,
    login
};