const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  test("GET 200 - respond with the array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(4);

        body.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("4. GET /api/reviews", () => {
  test("returns array of review objects including comment count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        body.forEach((review) => {
          expect(review).toMatchObject({
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("the reviews are returned in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
        expect(body[0].review_id).toBe(7);
      });
  });
});

describe.only("6. GET /api/reviews/:review_id/comments", () => {
  test("should respond with an array of comments for the given review id with the correct properties - ordered by newest first", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(6);
        body.forEach((item) => {
          expect(item).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            review_id: expect.any(Number),
          });
        });
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
});

/*
6. GET /api/reviews/:review_id/comments
i
Responds with:

an array of comments for the given review_id of which each comment should have the following properties:
- comment_id
- votes
- created_at
- author which is the username from the users table
- body
- review_id

comments should be served with the most recent comments first
*/

describe("ERROR 404 - end point not found", () => {
  test("if the end point is not found a message saying link not found is returned", () => {
    return request(app)
      .get("/sfjkbwkjdbwkjf")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("link not found");
      });
  });
});
