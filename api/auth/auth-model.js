const db = require("../../data/dbConfig");

function getById(id) {
  return db("users").where("id", id).first();
}

function getByUsername(username) {
  return db("users").where("username", username);
}

async function createUser({ username, password }) {
  const [id] = await db("users").insert({ username, password });
  return await getById(id);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = { getById, getByUsername, createUser, deleteUser };
