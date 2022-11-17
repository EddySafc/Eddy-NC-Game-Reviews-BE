const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewIdComments,
  getReviewsById,
  postReviewComment,
} = require("./controllers/controller.js");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getReviewIdComments);

app.post("/api/reviews/:review_id/comments", postReviewComment);

app.get("/*", (req, res) => {
  res.status(404).send({ msg: "link not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  if ((err.code = "22P02")) {
    res.status(400).send({ msg: "bad request" });
  }
});

module.exports = app;
