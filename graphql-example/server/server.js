const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const schema = require("./schema");
const app = express();


const server = new ApolloServer({
  schema,
});

// 使用自执行异步函数来启动服务器
async function startServer() {
  // 启动Apollo服务器
  await server.start();

  app.use(express.json());
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // 添加credentials选项
  }));

  // 为Apollo Server设置独立的路由
  app.use(
    "/graphql",
    expressMiddleware(server)
  );

  // 启动Express服务器
  app.listen(4000, () => {
    console.log("Now browse to localhost:4000/graphql");
  });
}

// 启动服务器
startServer().catch((err) => {
  console.error("启动服务器时出错:", err);
});
