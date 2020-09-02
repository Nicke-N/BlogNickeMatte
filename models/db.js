const Datastore = require("nedb-promises");

require('dotenv').config()

db = {};
if(process.env.ENVIROMENT == 'dev') {
    db.posts = new Datastore({ filename: __dirname + "/database/posts.db", autoload:true })
    db.comments = new Datastore({ filename: __dirname + "/database/comments.db", autoload:true })
    db.users = new Datastore({ filename: __dirname + "/database/users.db", autoload:true })
} else if(process.env.ENVIROMENT == 'TEST') {
    db.posts = new Datastore({ filename: __dirname + "/database/tests.posts.db", autoload:true })
    db.comments = new Datastore({ filename: __dirname + "/database/tests.comments.db", autoload:true })
    db.users = new Datastore({ filename: __dirname + "/database/tests.users.db", autoload:true })
    db.users.remove({}, { multi: true })
    db.comments.remove({}, {multi: true})
    db.posts.remove({}, {multi: true})
} else {
    console.log('db went bad')
}


module.exports = db