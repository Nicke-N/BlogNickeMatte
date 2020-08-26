const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments.js");
const auth = require("../middleware/auth.js")

// GET ALL EXISTING POSTS
router.get("/", auth, commentController.getComments);

// GET SINGLE POST
router.get("/:id", auth, commentController.getComment);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/:id/comment", auth, commentController.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.patch("/:id", auth, commentController.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;