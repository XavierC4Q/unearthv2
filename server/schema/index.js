const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const UserType = require('./types/usertype')
const UserResolver = require('./resolvers/userresolver')

const Types = [
  UserType
]

const Resolvers = [
  UserResolver
]

const AllTypes = mergeTypes(Types)
const AllResolvers = mergeResolvers(Resolvers)

module.exports = {
  AllTypes,
  AllResolvers
}
