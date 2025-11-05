const express = require("express")
const app = express()
const routers = require("./src/routes/router.js")


const PORT = 4000;

app.use(express.json())


app.use("/api", routers);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

