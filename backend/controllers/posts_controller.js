const models = require("../models");

exports.getAllPosts = (req, res) => {
  models.Posts.findAll({
    include: [
      { model: models.Users, attributes: ["uuid", "first_name", "last_name", "profil_picture"] },
      { model: models.Comments, include: { model: models.Users, attributes: ["uuid", "first_name", "last_name", "profil_picture", "createdAt"] } },
    ],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res) => {
  models.Posts.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.Users, attributes: ["uuid", "first_name", "last_name", "profil_picture"] },
      { model: models.Comments, include: { model: models.Users, attributes: ["uuid", "first_name", "last_name", "profil_picture", "createdAt"] } },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json({ error }));
};

exports.createPost = (req, res) => {
  models.Posts.create({
    title: req.body.title,
    content: req.body.content,
    ownerId: req.user.id,
    attachment: req.file ? `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}` : null,
  })
    .then((post) => res.status(201).json({ post }))
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteOnePost = (req, res) => {
  models.Posts.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (req.user.role === "admin" || req.user.id === post.ownerId) {
        if (post.image) {
          const filename = post.image.split("/images/posts/")[1];
          fs.unlink(`images/posts/${filename}`, (err) => {
            if (err) throw err;
          });
        }
        models.Posts.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "post deleted" }))
          .catch((error) => res.status(404).json({ error }));
      } else {
        return res.status(403).json({ error: "you don't have sufficient rights " });
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};

exports.updatePost = (req, res) => {
  models.Posts.findOne({
    where: { id: req.params.id },
  })
    .then(() => {
      models.Posts.update(
        {
          title: req.body.title,
          content: req.body.content,
          attachment: req.file ? `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}` : null,
        },
        {
          where: { id: req.params.id },
        }
      )
        .then((updatedPost) => {
          res.status(200).json({ updatedPost });
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};

// to add later if needed
// exports.PostLikeOrUnlike = (req, res) => {};
// exports.PostLikedByUsers = (req, res) => {};
