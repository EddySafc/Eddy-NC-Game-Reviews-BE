const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewIdComments,
  getReviewsById,
  getUsers,
  postReviewComment,
  patchReviewVotes,
} = require("./controllers/controller.js");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getReviewIdComments);

app.get("/api/users", getUsers);

app.post("/api/reviews/:review_id/comments", postReviewComment);

app.patch("/api/reviews/:review_id", patchReviewVotes);

app.get("/*", (req, res) => {
  res.status(404).send({ msg: "link not found" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  if (err.code === "23503") {
    if (err.constraint === "comments_author_fkey") {
      res.status(404).send({ msg: "username not found" });
    }
    if (err.constraint === "comments_review_id_fkey") {
      res.status(404).send({ msg: "id not found" });
    }
  }
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "bad request" });
  }
});

module.exports = app;
