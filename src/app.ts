// const express = require("express") ;

import express from "express";
import "dotenv/config";
import webRoute from "./routes/web";
import getConnection from "./config/db";

const app = express();

const port = process.env.PORT || 8080;

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config routes
webRoute(app);

// config static file: imgs/css/js
app.use(express.static("public"));

// config route
app.listen(8080, () => {
  console.log(`My app is running on port ${port}`);
});
