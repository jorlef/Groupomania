const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config({ path: "./config/.env" });

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    const user = await models.Users.findOne({ where: { uuid: decodedToken.userId } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ err: "invalid token" });
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!").message,
    });
  }
};
