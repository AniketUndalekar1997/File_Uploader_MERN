const mongoose = require("mongoose");
const { User } = require("./user");

const fileSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref:User,
  },
  originalname: {
    type: String,
    require: true,
  },

  mimetype: {
    type: String,
    require: true,
  },

  filename: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },

}, {
  toJSON: {
    transform: (doc, ret, options) => {
      ["path", "filename"].forEach(key => delete ret[key]);
      return ret;
    }
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = {
  File,
};
