// db/database.js
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

class DB {
  constructor() {
    // 数据库文件存放在项目根的 data 目录
    const dataDir = path.resolve(__dirname, "../data");
    const dbPath = path.join(dataDir, "user.db");

    // 确保数据目录存在
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.db = new Database(dbPath);
  }

  /** 初始化：创建示例表 */
  init() {
    const createTable = `
      CREATE TABLE IF NOT EXISTS users (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age  INTEGER
      );
    `;
    this.db.exec(createTable);
  }

  /** 关闭数据库连接 */
  close() {
    this.db.close();
  }
}

// 导出单例
module.exports = new DB();
