const express = require("express");
const PORT = process.env.PORT || 3000;
require("dotenv")
require("./config/db")

const app = express();

// routes
const {router} = require("./routes/authRoutes");


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParcer());

//cms route
app.use("/", router);

// authentication



app.get("/", (req, res) => {
    res.send("CMS Backend Running");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})