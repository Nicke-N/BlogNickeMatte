const postModel = require("../models/PostModel");
const AccessControl = require('accesscontrol');
const userModel = require("../models/UserModel");


const ac = new AccessControl()
ac.grant('user')
  .createOwn('post')
  .deleteOwn('post')
  .updateOwn('post')
  .readOwn('post')
  .createOwn('comment')
  .deleteOwn('comment')
  .updateOwn('comment')
  .readAny('comment')
.grant('admin')
  .extend('user')
  .updateAny('post')
  .deleteAny('post')
  .updateAny('comment')
  .deleteAny('comment')

  /**
 * men ja tror, att man kan använda en route ist för två (admin, user)
 */

exports.getPosts = async (req, res) => {
  
  try {
    const posts = await postModel.getPosts();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.countPosts = async (req,res) => {
  
  try {
    const posts = await postModel.countPosts();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
}

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
  const permission = ac.can(req.user.role).readOwn('post');
  try {
    const post = await postModel.getPost(id);
    if(permission){
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
    console.log(1)
    const updateUser = await userModel.setPost(ownerId, post._id)
    console.log(2)
    console.log(updateUser)
 
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.searchPost = async (req, res) => {

  const text = req.query.text;
 console.log(text)
  try {

    console.log(1)
    const post = await postModel.search(text);
    console.log(2)
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
