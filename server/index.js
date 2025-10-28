const express = require("express")
const app = express()
const router = express.Router()
const db = require('./src/config/db')


const PORT = 5000;

app.use(express.json())



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});