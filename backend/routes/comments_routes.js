const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth_middleware");

const commentsController = require("../controllers/comments_controller");

//Comments
router.get("/:id/allcomments", authMiddleware, commentsController.getAllComments);
router.post("/", authMiddleware, commentsController.createComment);
router.delete("/:id", authMiddleware, commentsController.deleteComment);

// to add later if needed
// router.put("/:id", authMiddleware, commentsController.updateComment);

module.exports = router;