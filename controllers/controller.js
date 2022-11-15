const { fetchCategories, fetchReviews } = require("../models/model");

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
