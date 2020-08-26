module.exports = {
    createUser: function (username, password, role) {
        
        return new Promise(async (resolve, reject) => {
            try {
              const doc = await db.users.insert({
                username, 
                password,
                role
                });
              resolve(doc);
            } catch (error) {
              reject(error);
            }
          });
        },
    loginUser: function (username) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = await db.users.find({username: username});
                resolve(doc);
            } catch (error) {
                reject(error);
            }
        })
    }
    

};
