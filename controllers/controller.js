const { fetchCategories, fetchReviewById } = require("../models/model");

exports.getCategories = (req, res) => {
  fetchCategories().then((categoryArray) => {
    res.send(categoryArray);
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
