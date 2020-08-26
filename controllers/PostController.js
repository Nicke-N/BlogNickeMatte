const postModel = require("../models/PostModel");

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
  const postId = req.params.id;
  
  try {
    const post = await postModel.getPost(postId);
    if(post.isOwner(req.user._id)){
      try {
        const deletedPost = await postModel.deletePost(postId);
        if(post.isOwner(req.user._id)){
          res.json({ message: "Number of deleted posts: " + deletedPost });
        } else {
          res.sendStatus(401)
        }

      } catch (error) {
        res.json({ error: error.message });
      }
    } else {
      res.sendStatus(401)
    }
    
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await postModel.getPost(postId);
    if(post.isOwner(req.user._id)){
      try {
        const updatedPost = await postModel.updatePost(postId, title, content);
        if(post.isOwner(req.user._id)){
          res.json({ message: "Number of updated posts: " + updatedPost });
        } else {
          res.sendStatus(401)
        }

      } catch (error) {
        res.json({ error: error.message });
      }
    } else {
      res.sendStatus(401)
    }
    
  } catch (error) {
    res.json({ error: error.message });
  }
};
