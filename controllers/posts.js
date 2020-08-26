const postModel = require("../models/posts");

exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.getPosts();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.getPost(id);
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await postModel.insertPost(title, content);
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const postID = req.params.id;
  try {
    const post = await postModel.deletePost(postID);
    res.json({ message: "Number of deleted posts: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await postModel.updatePost(postID, title, content);
    res.json({ message: "Number of updated posts: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};
