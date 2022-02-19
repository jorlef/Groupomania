const models = require("../models");

exports.getOneUser = async (req, res) => {
  try {
    models.Users.findOne({
      attributes: ["uuid", "email", "first_name", "last_name", "profil_picture", "role", "inactive"],
      where: {
        uuid: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "user not found" });
        }
        res.status(200).json({ user });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch (err) {
    res.status(500).json({ message: "Couldn't retrieve informations", err });
  }
};

exports.updateOneUser = async (req, res) => {
  try {
    if (req.file) {
      models.Users.findOne({ where: { uuid: req.user.uuid } })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ error: "You don't have access to this account" });
          }
          models.Users.update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              profil_picture: req.file ? `${req.protocol}://${req.get("host")}/images/profils/${req.file.filename}` : null,
            },
            {
              where: { uuid: req.user.uuid },
            }
          )
            .then((updatedUser) => {
              return res.status(201).json({ message: "user and picture successfully updated", updatedUser });
            })
            .catch((err) => {
              return res.status(500).json({ message: "couldn't update profil", err });
            });
        })
        .catch((err) => {
          return res.status(400).json({ err });
        });
    } else {
      models.Users.findOne({ where: { uuid: req.user.uuid } })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ error: "You don't have access to this account" });
          }
          models.Users.update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
            },
            {
              where: { uuid: req.user.uuid },
            }
          )
            .then((updatedUser) => {
              return res.status(201).json({ message: "user successfully updated", updatedUser });
            })
            .catch((err) => {
              return res.status(500).json({ message: "couldn't update profil", err });
            });
        })
        .catch((err) => {
          return res.status(400).json({ err });
        });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    models.Users.findOne({ where: { uuid: req.user.uuid } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "can't find account" });
        }
        models.Users.update(
          {
            inactive: 1,
          },
          {
            where: { uuid: req.user.uuid },
          }
        )
          .then((inactivatedUser) => {
            res.status(201).json({ message: "user inactivated", inactivatedUser });
          })
          .catch((err) => {
            res.status(500).json({ message: "couldn't delete user", err });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "something went wrong", err });
      });
  } catch (err) {
    res.status(500).json({ err });
  }
};
