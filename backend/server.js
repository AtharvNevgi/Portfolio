require("dotenv").config({quiet:true})
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
require("./config/db")
require("./config/cloudinary")

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// routes
const {router} = require("./routes/authRoutes");
const {aboutRouter} = require("./routes/aboutRoutes");
const {skillRouter} = require("./routes/skillRoutes");
const {projectRouter} = require("./routes/projectRoutes");
const {experienceRouter} = require("./routes/experienceRoutes");
const {serviceRouter} = require("./routes/serviceRoutes");
const {testimonialRouter} = require("./routes/testimonialsRoutes");
const blogRouter = require("./routes/blogRoutes");
const {contactRouter} = require("./routes/contactRoutes");

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

app.use("/cms/services", serviceRouter);

app.use("/cms/testimonials", testimonialRouter);

app.use("/cms/blogs", blogRouter);

app.use("/cms/contact", contactRouter);

// authentication



// app.get("/", (req, res) => {
//     res.send("CMS Backend Running");
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})