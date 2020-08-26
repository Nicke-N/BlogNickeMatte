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

  getComment: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({_id: id});
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
          postID,
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

  deleteComment: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.comments.remove({ _id: id });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },
};
