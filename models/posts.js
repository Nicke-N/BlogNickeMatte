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

  getPost: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.posts.find({_id: id});
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

  deletePost: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.remove({ _id: id });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  updatePost: function (ownerId, id, title, content) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.update({ _id: id }, { title, content }, {});
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },
};
