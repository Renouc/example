// commands/user.js
const { program } = require("commander");
const userController = require("../controllers/user");

function registerUserCommands() {
  const userCmd = program
    .command("user")
    .description("User management commands");

  userCmd
    .command("list")
    .description("List all users")
    .action(userController.list);

  userCmd
    .command("get <id>")
    .description("Get a user by ID")
    .action((id) => userController.get(Number(id)));

  userCmd
    .command("add <n> <age>")
    .description("Add a new user")
    .action((name, age) => userController.add(name, Number(age)));

  userCmd
    .command("update <id>")
    .description("Update a user")
    .option("-n, --name <name>", "User's name")
    .option("-a, --age <age>", "User's age", parseInt)
    .action((id, options) => userController.update(Number(id), options));

  userCmd
    .command("delete <id>")
    .description("Delete a user")
    .action((id) => userController.delete(Number(id)));
}

module.exports = registerUserCommands;
