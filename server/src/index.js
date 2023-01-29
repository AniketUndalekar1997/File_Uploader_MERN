const express = require("express");
const cors = require("cors");
const { createConnection } = require("./db");
const { authRouter } = require("./routers/auth-router");
const { fileRouter } = require("./routers/file-router");
const { authMiddleware } = require("./middlewares/auth-middleware");
const { fileDownloadRouter } = require("./routers/file-download-route");

createConnection(() => {
  console.log("Connected Mongo DB...");
});
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (request, response) => {
  response.json({
    message: "Pong",
  });
});

// app.use("/api/files", fileRouter);
app.use("/api/files", authMiddleware, fileRouter);
app.use("/api/auth", authRouter);
app.use("/api/download/file", fileDownloadRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
