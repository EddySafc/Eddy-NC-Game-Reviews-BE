const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewIdComments,
} = require("./controllers/controller.js");

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getReviewIdComments);

app.get("/*", (req, res) => {
  res.status(404).send({ msg: "link not found" });
});

module.exports = app;
