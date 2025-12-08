require("dotenv").config({quiet:true})
const express = require("express");
const PORT = process.env.PORT || 3000;
require("./config/db")

const app = express();

// routes
const {router} = require("./routes/authRoutes");
const {aboutRouter} = require("./routes/aboutRoutes");
const {skillRouter} = require("./routes/skillRoutes");
const {projectRouter} = require("./routes/projectRoutes");
const {experienceRouter} = require("./routes/experienceRoutes");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParcer());

//cms route
app.use("/cms", router);

app.use("/cms/about", aboutRouter);

app.use("/cms/skill", skillRouter)

app.use("/cms/project", projectRouter);

app.use("/cms/experience", experienceRouter);

// authentication



app.get("/", (req, res) => {
    res.send("CMS Backend Running");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})