const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth_middleware");
const multerUpload = require("../middlewares/multer-config");

const usersController = require("../controllers/users_controller");

//Users
router.get("/:id", authMiddleware, usersController.getOneUser);
router.put("/:id", authMiddleware, multerUpload.single("profil_picture"), usersController.updateOneUser);
router.delete("/delete_account", authMiddleware, usersController.deleteAccount);

module.exports = router;