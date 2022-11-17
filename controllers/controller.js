const {
  fetchCategories,
  fetchReviews,
  fetchReviewIdComments,
  fetchReviewById,
  updateReviewVotes,
  provideReviewComment,
} = require("../models/model");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categoryArray) => {
      res.send(categoryArray);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewIdComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewIdComments(review_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postReviewComment = (req, res, next) => {
  const newComment = req.body;
  const { review_id } = req.params;
  provideReviewComment(review_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReviewVotes(review_id, inc_votes)
    .then((result) => {
      res.status(201).send({ review: result[0] });
    })
    .catch((err) => {
      next(err);
    });
};
