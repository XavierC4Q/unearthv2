const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  photo: {
    type: String
  }
})


UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)

module.exports = User
