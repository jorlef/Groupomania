// import packages
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const { sequelize } = require("./models");
require("dotenv").config({path: './config/.env'});

//import files
const authRoutes = require('./routes/auth_routes');
const usersRoutes = require('./routes/users_routes');
const postsRoutes = require('./routes/posts_routes');
const commentsRoutes = require('./routes/comments_routes');

//connect to db
sequelize.authenticate()
  .then(() => console.log("Connection to db has been established successfully."))
  .catch((err) => console.log(err))

//start express
const app = express();

//set headers for cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // need to change for .env var for localhost
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  });

//middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.urlencoded({ extended: true })); //test if really necessary
app.use(express.json());

//serve static directory
app.use('/images', express.static(path.join(__dirname, '/images')));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

module.exports = app;