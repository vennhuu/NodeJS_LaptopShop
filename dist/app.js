"use strict";
const express = require("express");
const app = express();
const port = 8080;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/venn", (req, res) => {
    res.send("Hello Phước");
});
app.listen(8080, () => {
    console.log(`My app is running on port ${port}`);
});
//# sourceMappingURL=app.js.map