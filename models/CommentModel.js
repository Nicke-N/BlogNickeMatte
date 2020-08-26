module.exports = {
  getComments: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getComment: function (commentId) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({_id: commentId});
        resolve({
          ...doc,
          isOwner(userId) {
            // console.log(doc[0].ownerId)
            return doc[0].ownerId == userId
          }
        });
      } catch (error) {
        reject(error)
      }
    });
  },

  insertComment: function (ownerId, message, timestamp, postID) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.insert({
          ownerId,
          message,
          timestamp,
          postID
        });
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateComment: function (commentId, message, timestamp) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.update(
          { _id: commentId },
          {
            $set: {
              // ownerId: ownerId,
              message: message,
              timestamp: timestamp
            },
          },
          {}
        );
        resolve({
          ...doc,
          isOwner (userId) {
            return doc[0].ownerId == userId
          }
        });
      } catch {
        reject(error);
      }
    });
  },

  deleteComment: function (commentId) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.comments.remove({ _id: commentId });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },
};
