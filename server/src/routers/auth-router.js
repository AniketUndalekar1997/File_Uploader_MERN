const express = require("express");
const { User } = require("../models/user");
const { createUserToken } = require("../utils/jwt");

// baseUrl: /api/auth
const authRouter = express.Router();

//baseUrl: /api/auth/test
authRouter.get("/test", (request, response) => {
  response.json({
    message: "Auth Router is working",
  });
});

authRouter.post("/success", async (request, response) => {
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      user = await new User({
        ...request.body,
      }).save();
    }

    const token = createUserToken({
      uid: user.uid,
      _id: user._id,
    });

    response.json({
      message: "Login Success",
      accessToken: token,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      meta: error,
    });
  }
});

module.exports = {
  authRouter,
};
