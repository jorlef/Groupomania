const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth_middleware");
const multer = require("../middlewares/multer-config");

const postsController = require("../controllers/posts_controller");

//Posts
router.get("/", authMiddleware, postsController.getAllPosts);
router.get("/:id", authMiddleware, postsController.getOnePost);
router.post("/", authMiddleware, multer.single("post_image"), postsController.createPost);
router.delete("/:id", authMiddleware, postsController.deleteOnePost);
router.put("/:id", authMiddleware, postsController.updatePost);

//likes, to add later if needed
// router.post("/:id/like_unlike", authMiddleware, postsController.PostLikeOrUnlike);
// router.put("/:id/postLikedByUsers", authMiddleware, postsController.PostLikedByUsers);

module.exports = router;