const express = require("express");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);
server.use("/api/posts/:id/comments", commentRouter);

const port = 8001;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));