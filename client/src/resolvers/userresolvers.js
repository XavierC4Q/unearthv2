import gql from 'graphql-tag'

const CurrentUserFragment = gql`
fragment CurrentUser on User {
  username
  email
  photo
  firstName
  lastName
}`

const userID = 'CurrentUser'

export const UserResolvers = {
  defaults: {
    currentUser: null
  },
  resolvers: {
    Query: {
      getCurrentUser: (_, args, { cache }) => {
        return cache.readFragment({ fragment:CurrentUserFragment, id:userID })
      },
      logoutUser: async (_, args, { cache }) => {
        await cache.resetStore()
        return null
      }
    },
    Mutation: {
      setCurrentUser: (_, args, { cache }) => {
        const { username, email, photo, firstName, lastName } = args
        const data = {
          __typename: 'User',
          username: username,
          email: email,
          photo: photo,
          firstName: firstName,
          lastName: lastName
        }
        cache.writeFragment({id: 'CurrentUser', fragment: CurrentUserFragment, data: data})
        return null
      }
    }
  }
}
