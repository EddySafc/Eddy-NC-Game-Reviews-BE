exports.getEndpointsDescription = (req, res, next) => {
  res.send({
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
      exampleResponse: {
        endpoints: [{ This: "File" }],
      },
    },
    "GET /api/dailys": {
      description: "serves an array of all daily to dos",
      queries: [],
      exampleResponse: {
        result: [{ todo_id: 1, todo: "Run" }],
      },
    },
    "GET /api/weeklys": {
      description: "serves an array of all weekly to dos",
      queries: [],
      exampleResponse: {
        result: [{ todo_id: 7, todo: "Hoover" }],
      },
    },
    "GET /api/monthlys": {
      description: "serves an array of all monthly to dos",
      queries: [],
      exampleResponse: {
        result: [{ todo_id: 9, todo: "Mow Lawn" }],
      },
    },
    "POST /api/dailys": {
      description: "allows you to post a new todo",
      queries: [],
      exampleSendBody: {
        todo: "run",
      },
      exampleResponse: {
        result: [{ todo_id: 1, todo: "Run" }],
      },
    },
    "POST /api/weeklys": {
      description: "allows you to post a new todo",
      queries: [],
      exampleSendBody: {
        todo: "Shopping",
      },
      exampleResponse: {
        result: [{ todo_id: 11, todo: "Shopping" }],
      },
    },
    "POST /api/monthlys": {
      description: "allows you to post a new todo",
      queries: [],
      exampleSendBody: {
        todo: "Mow Lawn",
      },
      exampleResponse: {
        result: [{ todo_id: 13, todo: "Mow Lawn" }],
      },
    },
    "DELETE /api/dailys": {
      description: "Allows you to delete a todo by ID.",
      queries: [],
      exampleResponse: {},
    },
    "DELETE /api/weeklys": {
      description: "Allows you to delete a todo by ID.",
      queries: [],
      exampleResponse: {},
    },
    "DELETE /api/monthlys": {
      description: "Allows you to delete a todo by ID.",
      queries: [],
      exampleResponse: {},
    },
    "GET /api/users": {
      description:
        "serves an array of all users and there current score in descending order",
      queries: [],
      exampleResponse: {
        result: [
          { user_id: 1, user_name: "brian@gmail.com, score: 7" },
          { user_id: 2, user_name: "Mary@gmail.com, score: 17" },
        ],
      },
    },
    "POST /api/users": {
      description: "allows a new user to be created",
      queries: [],
      exampleSendBody: {
        user_name: "liam@gmail.com",
      },
      exampleResponse: {
        result: [{ user_id: 14, user_name: "liam@gmail.com", score: 0 }],
      },
    },
    "DELETE /api/users": {
      description: "Allows you to delete a user.",
      queries: [],
      exampleResponse: {},
    },
    "PATCH /api/users/:user_id": {
      description:
        "allows you to update the 'score' for a user and will return the updated article",
      "required keys": {
        inc_score: "<ANY NUMBER>",
      },
      exampleSendBody: {
        bodyExample: {
          inc_votes: 20,
        },
        bodyExample2: {
          inc_votes: -20,
        },
      },
      exampleResponse: {
        article: [
          {
            user_id: 14,
            user: "liam@gmail.com",
            score: 100,
          },
        ],
      },
    },
    "GET /api/recipes": {
      description: "serves an array of all recipes",
      queries: [],
      exampleResponse: {
        result: [
          {
            recipe_id: 9,
            recipe_name: "Cheese Sarny",
            recipe_pic: "recipe-pic",
          },
          {
            recipe_id: 10,
            recipe_name: "Egg Sarny",
            recipe_pic: "recipe-pic",
          },
          {
            recipe_id: 12,
            recipe_name: "Bacon Sarny",
            recipe_pic: "recipe-pic",
          },
        ],
      },
    },
    "POST /api/recipes": {
      description: "allows you to post a recipe",
      queries: [],
      exampleSendBody: {
        recipe_name: "Cheese Sarny",
        recipe_pic: "recipe-pic",
      },
      exampleResponse: {
        result: [{ recipe_name: "Cheese Sarny", recipe_pic: "recipe-pic" }],
      },
    },
  });
};
