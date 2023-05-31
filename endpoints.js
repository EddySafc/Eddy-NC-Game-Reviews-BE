exports.getEndpointsDescription = (req, res, next) => {
  res.send({
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
      exampleResponse: {
        endpoints: [{ This: "File" }],
      },
    },
    "GET /api/categories": {
      description: "serves an array of all categories",
      queries: [],
      exampleResponse: {
        result: [
          {
            slug: "euro game",
            description: "Abstact games that involve little luck",
          },
          {
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: "dexterity", description: "Games involving physical skill" },
          {
            slug: "children's games",
            description: "Games suitable for children",
          },
        ],
      },
    },
    "GET /api/reviews": {
      description: "serves an array of all reviews",
      queries: [],
      exampleResponse: {
        result: [
          {
            title: "Agricola",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Farmyard fun!",
            category: "euro game",
            created_at: new Date(1610964020514),
            votes: 1,
          },
          {
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: new Date(1610964101251),
            votes: 5,
          },
          {
            title: "Ultimate Werewolf",
            designer: "Akihisa Okui",
            owner: "bainesface",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "We couldn't find the werewolf!",
            category: "social deduction",
            created_at: new Date(1610964101251),
            votes: 5,
          },
        ],
      },
    },
    "GET /api/reviews/:review_id": {
      description: "serves a review for a particular review by id",
      queries: [],
      exampleResponse: {
        result: [
          {
            title: "Ultimate Werewolf",
            designer: "Akihisa Okui",
            owner: "bainesface",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "We couldn't find the werewolf!",
            category: "social deduction",
            created_at: new Date(1610964101251),
            votes: 5,
          },
        ],
      },
    },
    "GET /api/reviews/:review_id/comments": {
      description:
        "serves an array of all the comments for a particular review",
      queries: [],
      exampleSendBody: {
        todo: "run",
      },
      exampleResponse: {
        result: [
          {
            body: "I loved this game too!",
            votes: 16,
            author: "bainesface",
            review_id: 2,
            created_at: new Date(1511354613389),
          },
          {
            body: "My dog loved this game too!",
            votes: 13,
            author: "mallionaire",
            review_id: 2,
            created_at: new Date(1610964545410),
          },
          {
            body: "I didn't know dogs could play games",
            votes: 10,
            author: "philippaclaire9",
            review_id: 2,
            created_at: new Date(1610964588110),
          },
        ],
      },
    },
    "GET /api/users": {
      description: "serves an array of all the users",
      queries: [],
      exampleSendBody: {
        todo: "Shopping",
      },
      exampleResponse: {
        result: [
          {
            username: "philippaclaire9",
            name: "philippa",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "bainesface",
            name: "sarah",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
          {
            username: "dav3rid",
            name: "dave",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          },
        ],
      },
    },
    "POST /api/reviews/:review_id/comments": {
      description: "allows you to post a new comment for a particular review",
      queries: [],
      exampleSendBody: {
        todo: "Mow Lawn",
      },
      exampleResponse: {
        result: {
          body: "Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite",
          votes: 10,
          author: "philippaclaire9",
          review_id: 3,
          created_at: new Date(1616874588110),
        },
      },
    },
    "PATCH /api/reviews/:review_id": {
      description: "Allows you to alter a review.",
      queries: [],
      exampleResponse: {
        title: "Occaecat consequat officia in quis commodo.",
        designer: "Ollie Tabooger",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "Fugiat fugiat enim officia laborum quis. Aliquip laboris non nulla nostrud magna exercitation in ullamco aute laborum cillum nisi sint. Culpa excepteur aute cillum minim magna fugiat culpa adipisicing eiusmod laborum ipsum fugiat quis. Mollit consectetur amet sunt ex amet tempor magna consequat dolore cillum adipisicing. Proident est sunt amet ipsum magna proident fugiat deserunt mollit officia magna ea pariatur. Ullamco proident in nostrud pariatur. Minim consequat pariatur id pariatur adipisicing.",
        category: "social deduction",
        created_at: new Date(1600010368077),
        votes: 8,
      },
    },
    "DELETE /api/comments/:comment_id": {
      description: "Allows you to delete a review comment.",
      queries: [],
      exampleResponse: {
        body: "EPIC board game!",
        votes: 16,
        author: "bainesface",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    },
  });
};
