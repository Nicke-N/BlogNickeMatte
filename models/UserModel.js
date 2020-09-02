const jwt = require('jsonwebtoken');
const secret = "secret"
const bcrypt = require('bcryptjs')
const db = require("./db")

module.exports = {
    createUser: async (username, password, role) => {
      
      const user = await module.exports.findUser(username)


      if(user) {
        return "User exists!"
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)

        return new Promise(async (resolve, reject) => {
            const posts = []
            const comments = []
              try {
                const doc = await db.users.insert({
                  username, 
                  hashedPassword,
                  role,
                  posts,
                  comments
                  });
                resolve(doc);
              } catch (error) {
                reject(error);
              }
          });
      }
      
      },
    loginUser: function (username, password) {
      console.log(username)
      return new Promise(async (resolve, reject) => {    
        try {

            const user = await module.exports.findUser(username)

            if(user) {

                bcrypt.compare(password, user.hashedPassword, (err, result) => {

                  if(result){

                    const token = jwt.sign(user, secret)
                    
                    resolve({
                      token: token
                    })
                      
                  } else {
                      reject({msg: err + 'Login failed'})
                      
                  }
                }) 

                
               
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
