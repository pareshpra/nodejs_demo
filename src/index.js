// const express = require("express");
// const app = express();
// const port = process.env.port || "3000";
// const student =  require("./router/router");
// const ConnectionDb = require("./db/db.connection");
// const cors = require("cors");
// const bodyParser = require("body-parser");

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ConnectionDb from "./db/db.connection.js";
import student from "./user/user.router.js";
import product from "./product/product.route.js";

const port = process.env.port || "8000";

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }), // for parsing application/x-www-form-urlencoded
  cors({ origin: "*" }),
  bodyParser.json()
);

ConnectionDb();

app.use("/user", student);
app.use("/product", product);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
