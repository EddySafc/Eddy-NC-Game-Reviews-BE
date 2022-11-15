const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReviewById = (review_id) => {
  console.log(typeof parseInt(review_id));
  if (typeof review_id !== "number") {
    return Promise.reject({ status: 400, msg: "bad request" });
  } else {
    return db.query("SELECT * FROM reviews;").then((result) => {
      return result.rows[review_id - 1];
    });
  }
};
