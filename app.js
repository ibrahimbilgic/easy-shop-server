const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// api'lar /api/v1 gibi bir uzantıya sahip olur
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors);

// kursun ilerleyen asamalarinda body parser kullanilirsa onu json yap
//middleware
app.use(express.json()); // datamizin express tarafindan anlasilabilir yapmak icin
app.use(morgan("tiny")); //HTTP request logger middleware for node.js
app.use(authJwt()); // database guvenligi icin
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);
//api url
const api = process.env.API_URL;

//Routes
const categoriesRoutes = require("./routers/categories");
const productsRouter = require("./routers/products");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");

//Routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log("database connection error" + err);
  }); //mongodb ile baglanti kurmak icin
//server'in dinleyecegi portu belirliyoruz.
// development bolumu icin
app.listen(3000, () => {
  console.log("Server is running");
});

// production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
