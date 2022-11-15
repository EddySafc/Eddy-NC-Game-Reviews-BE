const { fetchCategories, fetchReviews } = require("../models/model");

exports.getCategories = (req, res) => {
  fetchCategories().then((categoryArray) => {
    res.send(categoryArray);
  });
};

exports.getReviews = (req, res) => {
  fetchReviews().then((reviews) => {
    res.send(reviews);
  });
};
