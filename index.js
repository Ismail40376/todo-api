require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
// const products = require("./app/products");
// const categories = require("./app/categories");
// const users = require("./app/users");
// const admin = require("./app/admin");
const mongoose = require("mongoose");

async function start() {
  await mongoose.connect("mongodb://localhost:27017/shop");

  app.use(express.static("public"));
  app.use(express.json());
  // app.use("/products", products);
  // app.use("/categories", categories);
  // app.use("/users", users);
  // app.use("/admin", admin);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}
start().catch(err => {
  console.error("Failed to start application:", err);
  process.exit(1);
});
