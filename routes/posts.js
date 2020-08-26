const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController.js");
const Auth = require("../middleware/auth.js")

// CREATE A NEW POST
router.post("/", Auth.user, postController.insertPost);

// GET ALL USER POSTS
router.get("/", Auth.user, postController.getUserPosts);

// GET ALL POSTS
router.get("/admin", Auth.admin, postController.getPosts)

// GET SINGLE POST
router.get("/:id", Auth.user, postController.getPost);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.patch("/:id", Auth.user, postController.updatePost);

// DELETE EXISTING POST
router.delete("/:id", Auth.user, postController.deletePost);


module.exports = router;
