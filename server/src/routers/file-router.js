const express = require("express");
const { verify } = require("jsonwebtoken");
const multer = require("multer");
const { getPayloadFromToken } = require("../utils/jwt");
const { File } = require("../models/file");
const { request, response } = require("express");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}_${file.originalname}`;
    cb(null, name);
  },
});

const fileUploadMiddleware = multer({ storage: storage });

// const fileUploadMiddleware = multer({ dest: 'uploads/' });

// baseUrl: /api/files
const fileRouter = express.Router();

// TODO: return files uploaded by logged in user
fileRouter.get("/", async (request, response) => {
  const userId = request.user._id;
  const pageSize = 5;
  const page = parseInt(request.query.page || "0");
  const total = await File.countDocuments({ user: userId });
  const files = await File.find({ user: userId })
    .limit(pageSize)
    .skip(pageSize * page);
  response.json({
    totalPages: Math.ceil(total / pageSize),
    files,
  });
});

fileRouter.post(
  "/upload",
  fileUploadMiddleware.any(),
  async (request, response) => {
    const userId = request.user._id;
    const files = request.files.map(
      ({ originalname, mimetype, filename, path, size }) => {
        return { user: userId, originalname, mimetype, filename, path, size };
      }
    );

    File.create(files)
      .then((result) => {
        response.json({ files: result });
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  }
);

// api/files/:fileid
fileRouter.get("/:fileid", async (request, response) => {
  const file = await File.findById(request.params.fileid);
  const filePath = path.join(process.cwd(), file.path);
  response.download(filePath);
});

module.exports = {
  fileRouter,
};
