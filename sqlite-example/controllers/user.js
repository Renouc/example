// controllers/user.js
const User = require("../models/user");
const View = require("../views/user");

exports.list = () => {
  const users = User.findAll();
  View.renderList(users);
};

exports.get = (id) => {
  const user = User.findById(id);
  View.renderUser(user);
};

exports.add = (name, age) => {
  User.create({ name, age });
  console.log(`Added user: ${name}`);
};

exports.update = (id, options) => {
  // 检查用户是否存在
  const user = User.findById(id);
  if (!user) {
    console.log(`User #${id} not found`);
    return;
  }

  // 准备要更新的字段
  const updateData = {
    id,
    name: options.name !== undefined ? options.name : user.name,
    age: options.age !== undefined ? options.age : user.age
  };

  User.update(updateData);
  console.log(`Updated user #${id}`);
};

exports.delete = (id) => {
  User.remove(id);
  console.log(`Deleted user #${id}`);
};
