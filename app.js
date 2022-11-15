const express = require("express");
const app = express();
const {
  getCategories,
  getReviewsById,
  getReviews,
} = require("./controllers/controller.js");

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/*", (req, res) => {
  res.status(404).send({ msg: "link not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});
module.exports = app;
