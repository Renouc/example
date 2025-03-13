const express = require("express");
const path = require("path");
const livereload = require("livereload");
const watch = require("node-watch");

// 创建 Express 应用
const app = express();
const PORT = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 启动 Express 服务器
app.listen(PORT, () => {
  console.log(`✨ 服务器已启动: http://localhost:${PORT}`);
  console.log(`📝 尝试修改 public 目录下的文件，保存后浏览器将自动刷新`);
});

// 创建 LiveReload 服务器
// 默认端口是 35729
const liveReloadServer = livereload.createServer({
  // 禁用延迟，文件变更后立即刷新
  delay: 0,
  // 尝试应用 CSS 变更而不刷新整页
  applyCSSLive: true,
  // 应用图片变更而不刷新整页
  applyImgLive: true,
});

// 定义监控的目录
const WATCH_PATH = path.join(__dirname, "public");

// 开始监控文件变更
console.log(`👀 开始监控文件变更: ${WATCH_PATH}`);
watch(WATCH_PATH, { recursive: true }, (evt, filepath) => {
  console.log(`🔄 检测到文件变更: ${filepath}`);

  // 告诉 LiveReload 服务器刷新浏览器
  liveReloadServer.refresh(filepath);
  console.log(`📢 已通知浏览器刷新`);
});

// 启动 LiveReload 服务器并监控 public 目录
liveReloadServer.watch(path.join(__dirname, "public"));
console.log(`🚀 LiveReload 服务已启动`);
