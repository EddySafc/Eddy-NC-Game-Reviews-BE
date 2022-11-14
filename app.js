const express = require("express");
const app = express();
const { getCategories } = require("./controllers/controller.js");

app.get("/api/categories", getCategories);

app.get("/*", (req, res) => {
  res.status(404).send({ msg: "link not found" });
});

module.exports = app;
