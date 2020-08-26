const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.js");


// CREATE A NEW POST
router.post("/", postController.insertPost);

// DELETE EXISTING POST
router.delete("/:id", postController.deletePost);

// GET ALL EXISTING POSTS
router.get("/", postController.getPosts);

// GET SINGLE POST
router.get("/:id", postController.getPost);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.patch("/:id", postController.updatePost);


module.exports = router;
