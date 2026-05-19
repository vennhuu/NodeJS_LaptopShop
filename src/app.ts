// const express = require("express") ;

import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`<h1 style="color:red;">Hello World nodemon update</h1>`);
});

app.get("/venn", (req, res) => {
  res.send("Hello Phước");
});

app.listen(8080, () => {
  console.log(`My app is running on port ${port}`);
  console.log("ENV port: ", process.env.PORT);
});
