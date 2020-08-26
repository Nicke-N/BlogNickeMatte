module.exports = {
  getPosts: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.posts.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getPost: function (postId) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.posts.find({_id: postId});
        resolve({
          ...doc,
          isOwner(userId) {
            return doc[0].ownerId == userId
          }
        });
      } catch (error) {
        reject(error)
      }
    });
  },

  insertPost: function (ownerId, title, content) {
    return new Promise(async (resolve, reject) => {
      try {
        
        
        const post = await db.posts.insert({ownerId, title, content });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  deletePost: function (postId) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.remove({ _id: postId });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  updatePost: function (postId, title, content) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.update({ _id: postId }, {$set:{ title: title, content: content }}, {});
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  }
};
