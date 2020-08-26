const commentModel = require("../models/comments");

exports.getComments = async (req, res) => {
  try {
    const comments = await commentModel.getComments();
    res.json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await commentModel.getComment(id);
    res.json(comment);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertComment = async (req, res) => {
  const postID = req.params.id;
  const { user, message, timestamp } = req.body;
  try {
    const comment = await commentModel.insertComment(
      user,
      message,
      timestamp,
      postID
    );
    res.json(comment).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { user, message, timestamp } = req.body;
  try {
    const comment = await commentModel.updateComment(
      commentId,
      user,
      message,
      timestamp
    );
    res.json({ message: "Number of updated comments: " + comment }).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const post = await commentModel.deleteComment(commentId);
    res.json({ message: "Number of deleted comments: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};
