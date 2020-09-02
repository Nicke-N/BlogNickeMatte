const commentModel = require("../models/CommentModel");

exports.getComments = async (req, res) => {
  try {
    const comments = await commentModel.getComments();
    res.json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getUserComments = async (req, res) => {
  const ownerId = req.user._id
  try {
    const comments = await commentModel.getUserComments(ownerId);
    res.json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.countComments = async (req,res) => {

  try {
    const comments = await commentModel.countComments();
    res.json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
}

exports.getComment = async (req, res) => {
  const id = req.params.id;
  try {
    console.log('happens')
    const comment = await commentModel.getComment(id);
    if(comment.isOwner(req.user._id) || req.user.role == 'admin') {
      console.log('OK')
      res.json(comment);
      return res.status(200);
    } else {
      res.sendStatus(401)
    }
    
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertComment = async (req, res) => {
  const postID = req.params.id;
  const ownerId = req.user._id;
  const { message} = req.body;
  // console.log(user)
  console.log(req.user)
  try {
    const comment = await commentModel.insertComment(
      ownerId,
      message,
      postID
    );
    res.json(comment).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentModel.getComment(commentId);
    if(comment.isOwner(req.user._id)|| req.user.role == 'admin') {
      const { message, timestamp } = req.body;
      try {

      const updatedComment = await commentModel.updateComment(
        commentId,
        message,
        timestamp
      );
      
      res.json({ message: "Number of updated comments: " + updatedComment }).status(200);
      } catch (error) {
        res.json({ error: error.message }).status(500);
      }

    } else {
      res.sendStatus(401)
    }

  } catch(error) {
    res.send(error)
  }
}
 

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentModel.getComment(commentId);
    if(comment.isOwner(req.user._id)|| req.user.role == 'admin') {
      try {
      const deletedComment = await commentModel.deleteComment(
        commentId
      );
      
      res.json({ message: "Comment was deleted"}).status(200);
      } catch (error) {
        res.json({ error: error.message }).status(500);
      }

    } else {
      res.sendStatus(401)
    }

  } catch(error) {
    res.send(error)
  }
}
