const models = require("../models");

exports.getAllComments = async (req, res) => {
  models.Comments.findAll({
    where: {
      postId: req.params.id,
    },
  })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createComment = async (req, res) => {
  models.Posts.findOne({ where: { id: req.body.postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post introuvable !" });
      }

      models.Comments.create({
        comments: req.body.comments,
        ownerId: req.user.id,
        postId: post.id,
      })
        .then((comment) => res.status(201).json({ comment }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.deleteComment = async (req, res) => {
  if (req.user.role === "admin") {
    models.Comments.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(404).json({ error }));
  } else {
    models.Users.findOne({ where: { uuid: req.user.uuid } })
      .then((user) => {
        if (!user) {
          return res.status(403).json({ error: "insufficient rights" });
        }
        models.Comments.findOne({ where: { id: req.params.id } }).then((comment) => {
          if (user.id === comment.ownerId) {
            models.Comments.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
              .catch((error) => res.status(404).json({ error }));
          } else {
            return res.status(401).json({ message: "Ce commentaire ne vous appartient pas" });
          }
        });
      })
      .catch((error) => res.status(401).json({ message: "Utilisateur inexistant" }));
  }
};

// to add later if needed
// exports.updateComment = (req, res) => {};
