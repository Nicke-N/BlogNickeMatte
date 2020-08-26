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
    if(post.isOwner(req.user._id)){
      res.json(post);
    } else {
      res.sendStatus(401)
    }
    
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertPost = async (req, res) => {
  const { title, content } = req.body;
  const ownerId = req.user._id
  try {
    const post = await postModel.insertPost(ownerId, title, content);
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
    const post = await postModel.updatePost(ownerId, postID, title, content);
    if(post.isOwner(req.user._id)){
      res.json({ message: "Number of updated posts: " + post });
    } else {
      res.sendStatus(401)
    }
    
  } catch (error) {
    res.json({ error: error.message });
  }
};
