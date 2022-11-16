const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReviews = () => {
  return db
    .query(
      "SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;"
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT * 
    FROM reviews 
    WHERE review_id =$1;`,
      [review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: "id not found" });
      } else return review;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
