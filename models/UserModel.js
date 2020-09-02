const jwt = require('jsonwebtoken');
const secret = "secret"
const bcrypt = require('bcryptjs')
const db = require("./db")

module.exports = {
    createUser: function (username, password, role) {
        
        return new Promise(async (resolve, reject) => {
          const posts = []
          const comments = []
            try {
              const doc = await db.users.insert({
                username, 
                password,
                role,
                posts,
                comments
                });
              resolve(doc);
            } catch (error) {
              reject(error);
            }
          });
        },
    loginUser: function (username, password) {
      
      return new Promise(async (resolve, reject) => {    
        try {

            const user = await module.exports.findUser(username)

            if(user) {
                console.log(1)
                if(bcrypt.compareSync(password, user.password)) {

                  const token = jwt.sign(user, secret)
                    console.log(3)
                  resolve({
                    token: token,
                    msg: 'Login suceeded'
                  })
                    
                } else {
                  console.log(2)
                    reject({msg: 'Login failed'})
                    
                }
               
            } else {
                reject({msg:'user does not exist'})
            }
            

        } catch (error) {
            reject({msg: error.message})
        }
    })
    },
    countUsers: function () {
      return new Promise(async (resolve, reject) => {
        try {
          
          const doc = await db.users.find({});
          resolve(doc.length);
        } catch (error) {
          
          reject(error);
        }
      });
    },
    postOwner: (postId) => {
      return new Promise(async (resolve, reject) => {
        try {
          const doc = await db.users.findOne({ posts: { $elemMatch: postId }})
          resolve(doc)
        } catch (error) {
          reject(error)
        }
      })
    },
    commentOwner: (commentId) => {
      return new Promise(async (resolve, reject) => {
        try {
          const doc = await db.users.findOne({ comments: { $elemMatch: commentId }})
          resolve(doc)
        } catch (error) {
          reject(error)
        }
      })
    },
    setPost: (ownerId, postId) => {
      return new Promise(async (resolve, reject) => {
        try {
          const doc =  await db.users.update({_id: ownerId}, {$push: {posts: postId}})
          resolve(doc)
        } catch (error) {
          reject(error)
        }
      })
    },
    setComment: (ownerId, commentId) => {
      return new Promise(async (resolve, reject) => {
        try {
          const doc =  await db.users.update({_id: ownerId}, {$push: {comments: commentId}})
          resolve(doc)
        } catch (error) {
          reject(error)
        }
      })
    },
  findUser: (username) => {
      return new Promise(async (resolve, reject) => {
        
          try {
              const docs = db.users.findOne(
                  {
                      username: username
                  }
              )
              
              resolve(docs)
          } catch (error) {
              reject(error)
          }
      })
  },
  getUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
          const docs = db.users.findOne({_id: userId})
          resolve(docs)
      } catch (error) {
        reject(error)
      }
    })
  }


};
