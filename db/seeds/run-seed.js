const devData = require("../data/test-data/index.js"); //changed to test data
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(testData).then(() => db.end());
};

runSeed();
