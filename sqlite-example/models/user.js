// models/user.js
const { db } = require("../db/database");

const create = ({ name, age }) =>
  db.prepare("INSERT INTO users (name, age) VALUES (?, ?)").run(name, age);

const findAll = () => db.prepare("SELECT * FROM users").all();

const findById = (id) => db.prepare("SELECT * FROM users WHERE id = ?").get(id);

const update = ({ id, name, age }) =>
  db
    .prepare("UPDATE users SET name = ?, age = ? WHERE id = ?")
    .run(name, age, id);

const remove = (id) => db.prepare("DELETE FROM users WHERE id = ?").run(id);

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
