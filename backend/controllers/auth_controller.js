const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config({ path: "./config/.env" });

const { signupErrors } = require("../utils/errorsManager");

exports.signup = async (req, res) => {
  try {
    const { ...userInfos } = req.body;

    if (req.body.password.length > 7 && req.body.password.length < 33) {
      bcrypt
        .hash(userInfos.password, 7)
        .then((hash) => {
          models.Users.create({
            ...userInfos,
            password: hash,
            role: "user",
          })
            .then((newUser) => {
              return res.status(201).json({ newUser });
            })
            .catch((err) => {
              const errors = signupErrors(err, password);
              return res.status(500).json({ errors });
            });
        })
        .catch((err) => {
          return res.status(500).json({ err });
        });
    } else {
      return res.status(500).json({ errors: { password: "doit être entre 8 à 32 caractères" } });
    }
  } catch (err) {
    res.status(500).json({ error: "registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { ...userInfos } = req.body;

    models.Users.findOne({ where: { email: userInfos.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "user not found" });
        }
        bcrypt
          .compare(userInfos.password, user.password)
          .then((isValid) => {
            if (!isValid) {
              return res.status(401).json({ error: "incorrect password" });
            }
            res.status(200).json({
              userId: user.uuid,
              token: jwt.sign({ userId: user.uuid }, process.env.JWT_KEY, { expiresIn: "24h" }),
            });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch (err) {
    res.status(500).json({ error: "connection failed" });
  }
};
