const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.js");
const auth = require("../middleware/auth.js")

// CREATE A NEW POST
router.post("/", auth, postController.insertPost);

// DELETE EXISTING POST
router.delete("/:id", auth, postController.deletePost);

// GET ALL EXISTING POSTS
router.get("/", auth, postController.getPosts);

// GET SINGLE POST
router.get("/:id", auth, postController.getPost);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.patch("/:id", auth, postController.updatePost);


module.exports = router;
