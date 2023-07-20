const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

function getByUsername(username) {
  return db("users").where("username", username);
}

async function createUser({ username, password }) {
  const [id] = await db("users").insert({ username, password });
  return await getByUsername(id);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = { getAll, getByUsername, createUser, deleteUser };
