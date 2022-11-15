const { commentData } = require("../db/data/test-data");
const {
  convertTimestampToDate,
  createRef,
  formatComments,
  addCommentCountToReviews,
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createRef", () => {
  test("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test("returns a reference object when passed an array with a single items", () => {
    const input = [{ title: "title1", article_id: 1, name: "name1" }];
    let actual = createRef(input, "title", "article_id");
    let expected = { title1: 1 };
    expect(actual).toEqual(expected);
    actual = createRef(input, "name", "title");
    expected = { name1: "title1" };
    expect(actual).toEqual(expected);
  });
  test("returns a reference object when passed an array with many items", () => {
    const input = [
      { title: "title1", article_id: 1 },
      { title: "title2", article_id: 2 },
      { title: "title3", article_id: 3 },
    ];
    const actual = createRef(input, "title", "article_id");
    const expected = { title1: 1, title2: 2, title3: 3 };
    expect(actual).toEqual(expected);
  });
  test("does not mutate the input", () => {
    const input = [{ title: "title1", article_id: 1 }];
    const control = [{ title: "title1", article_id: 1 }];
    createRef(input);
    expect(input).toEqual(control);
  });
});

describe("formatComments", () => {
  test("returns an empty array, if passed an empty array", () => {
    const comments = [];
    expect(formatComments(comments, {})).toEqual([]);
    expect(formatComments(comments, {})).not.toBe(comments);
  });
  test("converts created_by key to author", () => {
    const comments = [{ created_by: "ant" }, { created_by: "bee" }];
    const formattedComments = formatComments(comments, {});
    expect(formattedComments[0].author).toEqual("ant");
    expect(formattedComments[0].created_by).toBe(undefined);
    expect(formattedComments[1].author).toEqual("bee");
    expect(formattedComments[1].created_by).toBe(undefined);
  });
  test("replaces belongs_to value with appropriate id when passed a reference object", () => {
    const comments = [{ belongs_to: "title1" }, { belongs_to: "title2" }];
    const ref = { title1: 1, title2: 2 };
    const formattedComments = formatComments(comments, ref);
    expect(formattedComments[0].article_id).toBe(1);
    expect(formattedComments[1].article_id).toBe(2);
  });
  test("converts created_at timestamp to a date", () => {
    const timestamp = Date.now();
    const comments = [{ created_at: timestamp }];
    const formattedComments = formatComments(comments, {});
    expect(formattedComments[0].created_at).toEqual(new Date(timestamp));
  });
});

describe.only("add comment count to reviews", () => {
  test("when reviewData is an empty array an empty array is returned", () => {
    const comment_data = [
      {
        article_id: undefined,
        author: "philippaclaire9",
        created_at: "2021-03-27T19:49:48.110Z",
        body: "Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite",
        votes: 10,
        review_id: 3,
      },
    ];
    expect(addCommentCountToReviews([], comment_data)).toEqual([]);
  });
  test("when comment data is empty the same review data array should return with comment counts added as value 0", () => {
    const review_data = [
      {
        created_at: "2021-01-18T10:00:20.514Z",
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        votes: 1,
        comment_count: 0,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        votes: 5,
        comment_count: 0,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        votes: 5,
        comment_count: 0,
      },
    ];
    expect(addCommentCountToReviews(review_data, [])).toEqual(review_data);
  });
  test("review data will count amount of comments that have the its review ID and add this amount to the end of the array", () => {
    const review_data = [
      {
        created_at: "2021-01-18T10:00:20.514Z",
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        votes: 1,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        votes: 5,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        votes: 5,
      },
    ];
    const comment_data = [
      {
        article_id: undefined,
        author: "bainesface",
        created_at: "2017-11-22T12:43:33.389Z",
        body: "I loved this game too!",
        votes: 16,
        review_id: 2,
      },
      {
        article_id: undefined,
        author: "mallionaire",
        created_at: "2021-01-18T10:09:05.410Z",
        body: "My dog loved this game too!",
        votes: 13,
        review_id: 3,
      },
      {
        article_id: undefined,
        author: "philippaclaire9",
        created_at: "2021-01-18T10:09:48.110Z",
        body: "I didn't know dogs could play games",
        votes: 10,
        review_id: 3,
      },
    ];
    expected = [
      {
        created_at: "2021-01-18T10:00:20.514Z",
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        votes: 1,
        comment_count: 0,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        votes: 5,
        comment_count: 1,
      },
      {
        created_at: "2021-01-18T10:01:41.251Z",
        title: "Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        votes: 5,
        comment_count: 2,
      },
    ];
    expect(addCommentCountToReviews(review_data, comment_data)).toEqual(
      expected
    );
  });
  test("inputs do not mutate", () => {
    const review_data = [
      {
        created_at: "2021-01-18T10:00:20.514Z",
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        votes: 1,
      },
    ];
    const comment_data = [
      {
        article_id: undefined,
        author: "philippaclaire9",
        created_at: "2021-01-18T10:09:48.110Z",
        body: "I didn't know dogs could play games",
        votes: 10,
        review_id: 1,
      },
    ];
    addCommentCountToReviews(review_data, comment_data);
    expect(review_data).toEqual([
      {
        created_at: "2021-01-18T10:00:20.514Z",
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        votes: 1,
      },
    ]);
    expect(comment_data).toEqual([
      {
        article_id: undefined,
        author: "philippaclaire9",
        created_at: "2021-01-18T10:09:48.110Z",
        body: "I didn't know dogs could play games",
        votes: 10,
        review_id: 1,
      },
    ]);
  });
});
