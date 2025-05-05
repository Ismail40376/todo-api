require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
// const products = require("./app/products");
// const categories = require("./app/categories");
const users = require("./app/users");
// const admin = require("./app/admin");
const mongoose = require("mongoose");
const tasks = require("./app/tasks");

async function start() {
  await mongoose.connect("mongodb://localhost:27017/todo");

  app.use(express.json());
  app.use("/users", users);
  app.use("/tasks", tasks);
  // app.use("/admin", admin);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}

process.on("SIGINT", async () => {
  console.log("SIGINT received - closing MongoDB connection");
  await disconnect();
  process.exit(0);
});

process.on("exit", () => {
  disconnect();
});

start().catch(err => {
  console.error("Failed to start application:", err);
  process.exit(1);
});
