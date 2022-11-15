const {
  fetchCategories,
  fetchReviewById,
  fetchReviews,
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
