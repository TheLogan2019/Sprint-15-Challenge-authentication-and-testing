const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

function getByUsername(username) {
  return db("users").where("username", username);
}

const insertUser = (user) => {
  return db("users").insert(user);
};

module.exports = { getAll, getByUsername, insertUser };
