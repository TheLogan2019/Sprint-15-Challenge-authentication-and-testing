const db = require("../../data/dbConfig");

async function getById(id) {
  return await db("users").where("id", id).first();
}

async function getByUsername(username) {
  return await db("users").where("username", username);
}

async function createUser({ username, password }) {
  const [id] = await db("users").insert({ username, password });
  return await getById(id);
}

async function deleteUser(id) {
  return await db("users").where("id", id).del();
}

module.exports = { getById, getByUsername, createUser, deleteUser };
