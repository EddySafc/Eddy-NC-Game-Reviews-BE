const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReviews = () => {
  return db.query("SELECT * FROM reviews;").then((result) => {
    //console.log(result.rows);
  });
};
