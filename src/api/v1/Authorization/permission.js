const acl = require("acl")
const mongoose = require("../../../config/mongoose");

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/HR")

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Permission =  new acl(new acl.memoryBackend())


Permission.allow([
    {
      roles: 'manager',
      allows: [
        {
          resources: '/posts/publish',
          permissions: '*'
        }
      ]
    },
      {
      roles: 'writer',
      allows: [
        {
          resources: '/posts',
          permissions: 'post'
        }
      ]
    },
    {
      roles: 'guest',
      allows: [
        {
          resources: '/posts',
          permissions: 'get'
        }
      ]
    }
  ]);


//console.log("aaaBBZZB",Permission)

Permission.addUserRoles('truong', 'guest')
Permission.roleUsers("guest",function(err, users){
    console.log("aaasdsa",users)
})


module.exports = Permission;