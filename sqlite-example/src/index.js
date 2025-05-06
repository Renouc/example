// src/app.js
const { program } = require("commander");
const db = require("../db/database");
const registerUserCommands = require("../commands/user");
const packageJson = require("../package.json");

// 设置版本信息
program.version(packageJson.version, "-v, --version", "显示版本号");

try {
  db.init();
} catch (error) {
  console.error("Failed to initialize database", error);
  process.exit(1);
}

registerUserCommands();
program.parse(process.argv);
