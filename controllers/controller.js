const {
  fetchCategories,
  fetchReviews,
  fetchReviewIdComments,
  fetchReviewById,
  fetchUsers,
  updateReviewVotes,
  provideReviewComment,
  removeCommentById,
} = require("../models/model");

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
  const query = req.query;
  fetchReviews(query)
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((err) => {
      next(err);
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

exports.getReviewIdComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewIdComments(review_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.send({ users: users });
  });
};

exports.postReviewComment = (req, res, next) => {
  const newComment = req.body;
  const { review_id } = req.params;
  provideReviewComment(review_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReviewVotes(review_id, inc_votes)
    .then((result) => {
      res.status(201).send({ review: result[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((result) => {
      console.log(result);
      res.status(204).send({ comment: result[0] });
    })
    .catch((err) => {
      next(err);
    });
};
