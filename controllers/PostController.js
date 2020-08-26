const postModel = require("../models/PostModel");

exports.getPosts = async (req, res) => {
  
  try {
    const posts = await postModel.getPosts();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message});
  }
};

exports.getUserPosts = async (req, res) => {
  const ownerId = req.user._id
  try {
    const posts = await postModel.getUserPosts(ownerId);
    res.json(posts);
  } catch (error) {
    res.json({ error: error.messag});
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.getPost(id);
    if(post.isOwner(req.user._id) || req.user.role == 'admin'){
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
    if(post.isOwner(req.user._id) || req.user.role == 'admin'){
      try {
        const deletedPost = await postModel.deletePost(postId);

          res.json({ message: "Number of deleted posts: " + deletedPost });        

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
    if(post.isOwner(req.user._id) || req.user.role == 'admin'){
      try {
        const updatedPost = await postModel.updatePost(postId, title, content);
        
        res.json({ message: "Number of updated posts: " + updatedPost });

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
