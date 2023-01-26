const jsonWebToken = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey@123"; // TODO set this to env file

const createUserToken = (payload = {}) => {
  return jsonWebToken.sign(payload, SECRET_KEY);
};

const getPayloadFromToken = (token) => {
  try {
    return jsonWebToken.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createUserToken,
  getPayloadFromToken,
};
