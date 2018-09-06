const User = require('../../models/users')

module.exports = {
  Query: {
    isLoggedIn: (obj, args, context, info) => {
      if(context.req.session.passport){
        return true
      }
      else {
        return false
      }
    },
    allUsers: async (obj, args, context, info) => {
      let listOfUsers = await User.find()
      return listOfUsers
    },
    getUser: async (obj, args, context, info) => {
      let foundUser = await User.findOne({ username: args.username })
      if(!foundUser){
        return null
      }
      return foundUser
    },
    logout: async (obj, args, context, info) => {
      if(context.req.session.passport){
        await context.req.session.destroy()
        return true
      }
      else {
        return false
      }
    }
  },
  Mutation: {
    register: async (obj, args, context, info) => {
      const { username, password, email, photo, firstName, lastName } = args
      let usernameTaken = await User.findOne({ username: username })
      let emailTaken = await User.findOne({ email: email })
      if(usernameTaken){
        return new Error("USERNAME IS TAKEN")
      }
      if(emailTaken){
        return new Error("EMAIL IS TAKEN")
      }
      let newUser = new User({
        username: username,
        email: email,
        photo: photo,
        firstName: firstName,
        lastName: lastName
      })

      await newUser.setPassword(password)
      await newUser.save()
      return newUser
    },
    login: async (obj, args, context, info) => {
      const { username, password } = args
      if(!context.req.session.passport){
        let auth = new Promise(function(resolve, reject){
          User.authenticate('local')(username, password, async function(error, user) {
            if (error) {
              reject(error)
            }
            if (!user) {
              reject("Invalid")
            }
            context.req.logIn(user, async function(error) {
              if (error) {
                reject(error)
              } else {
                resolve(user)
              }
            })
          })
        })

        let loginUser = Promise.resolve(auth).then( async () => {
          let user = await User.findOne({ username: username })
          if(!user) {
            return new Error("User not available")
          }
          else {
            return user
          }
        })
        .catch(error => {
          return error
        })
        return loginUser
      }
      else {
        return new Error("Logged in already")
      }
    }
  }
}
