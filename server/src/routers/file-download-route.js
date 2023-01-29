const express = require("express");
const { verify } = require("jsonwebtoken");
const { getPayloadFromToken } = require("../utils/jwt");
const { File } = require("../models/file");
const { request, response } = require("express");
const path = require("path");

// baseUrl: /api/files/download
const fileDownloadRouter = express.Router();

// api/download/file:fileid
fileDownloadRouter.get("/:fileid", async (request, response) => {
  const file = await File.findById(request.params.fileid);
  const filePath = path.join(process.cwd(), file.path);
  response.download(filePath);
});

module.exports = {
  fileDownloadRouter,
};
