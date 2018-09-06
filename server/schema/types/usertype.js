module.exports = `
  type User {
    username: String!
    password: String!
    email: String!
    photo: String
    firstName: String
    lastName: String
  }

  type Query {
    isLoggedIn: Boolean!
    allUsers: [User]
    getUser(username: String): User
    logout: Boolean!
  }

  type Mutation {
    register(username: String!, password: String!, email: String!, photo: String, firstName: String, lastName: String): User
    login(username: String!, password: String!): User
  }
`
