const express = require("express");
const app = express();
const { getCategories, catchAll } = require("./controllers/controller.js");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/*", catchAll);

module.exports = app;
