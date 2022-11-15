const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReviews = () => {
  return db
    .query("SELECT * FROM reviews ORDER BY created_at DESC;")
    .then((result) => {
      return result.rows;
    });
};
