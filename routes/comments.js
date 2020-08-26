const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");
const Auth = require("../middleware/auth.js")

// GET ALL EXISTING POSTS
router.get("/admin", Auth.admin, commentController.getComments);

router.get("/", Auth.user, commentController.getUserComments)

// GET SINGLE POST
router.get("/:id", Auth.user, commentController.getComment);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/:id/comment", Auth.user, commentController.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.patch("/:id", Auth.user, commentController.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/:id", Auth.user, commentController.deleteComment);

module.exports = router;