const { fetchCategories } = require("../models/model");

exports.getCategories = (req, res) => {
  fetchCategories().then((categoryArray) => {
    res.send(categoryArray);
  });
};

exports.catchAll = (req, res) => {
  res.status(404).send({ msg: "link not found" });
};
