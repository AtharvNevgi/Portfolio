const mongoose = require("mongoose");
require("dotenv").config({quiet:true})

// mongoose.connect("mongodb://localhost:27017/Portfolio")
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Database connection failed", err);
})