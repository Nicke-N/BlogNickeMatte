const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments.js");


// GET ALL EXISTING POSTS
router.get("/", commentController.getComments);

// GET SINGLE POST
router.get("/:id", commentController.getComment);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/:id/comment", commentController.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.patch("/:id", commentController.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/:id", commentController.deleteComment);

module.exports = router;