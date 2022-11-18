const db = require("../db/connection");
const { checkCategoryExists } = require("../db/seeds/utils");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.fetchReviews = (query) => {
  if (
    Object.keys(query).length !== 0 &&
    !query.category &&
    !query.sort_by &&
    !query.order
  ) {
    return Promise.reject({ status: 404, msg: "query name not found" });
  }

  let queryString = `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.comment_id) 
AS comment_count 
FROM reviews 
LEFT JOIN comments 
ON comments.review_id = reviews.review_id`;

  const queryValues = [];

  if (query.category) {
    queryString += " WHERE category = $1";
    queryValues.push(query.category);
  }

  queryString += " GROUP BY reviews.review_id";

  if (query.sort_by) {
    queryString += ` ORDER BY ${query.sort_by}`;
  } else queryString += " ORDER BY reviews.created_at";

  if (query.order) {
    queryString += ` ${query.order}`;
  } else queryString += " DESC";

  queryString += ";";

  return db
    .query(queryString, queryValues)
    .then((result) => {
      if (result.rows[0]) {
        return result.rows;
      }
      if (query.category) {
        return checkCategoryExists(query.category);
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at,review_body, reviews.votes, designer, COUNT(comments.comment_id) 
      AS comment_count 
      FROM reviews 
      LEFT JOIN comments 
      ON comments.review_id = reviews.review_id 
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id; 
      `,
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

exports.fetchReviewIdComments = (review_id) => {
  return db
    .query(
      `SELECT * 
  FROM comments
  WHERE review_id = $1
  ORDER BY created_at DESC
  ;`,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return db
          .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
          .then((res) => {
            if (res.rows.length === 0) {
              return Promise.reject({ status: 404, msg: "id not found" });
            } else return result.rows;
          });
      } else return result.rows;
    });
};

exports.fetchUsers = () => {
  return db
    .query(`SELECT * FROM users;`)
    .then((users) => {
      return users.rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.provideReviewComment = (review_id, newComment) => {
  if (
    newComment.hasOwnProperty("username") === false ||
    newComment.hasOwnProperty("body") === false
  ) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return db
    .query(
      `INSERT INTO comments
  (body, review_id, author)
  VALUES
  ($1, $2, $3)RETURNING*;`,
      [newComment.body, review_id, newComment.username]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.updateReviewVotes = (review_id, inc_votes) => {
  return db
    .query(
      `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING*;`,
      [inc_votes, review_id]
    )
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({ status: 404, msg: "id not found" });
      }
      return result.rows;
    });
};
