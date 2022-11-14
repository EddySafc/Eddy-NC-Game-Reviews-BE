const { fetchCategories } = require("../models/model");

exports.getCategories = (req, res) => {
  fetchCategories().then((categoryArray) => {
    res.send(categoryArray);
  });
};
