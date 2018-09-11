import gql from 'graphql-tag'

const CurrentUserFragment = gql`
fragment CurrentUser on User {
  username
  email
  photo
  firstName
  lastName
}`

const userID = `User:CurrentUser`

export const UserResolvers = {
  defaults: {
    currentUser: null
  },
  resolvers: {
    Query: {
      getCurrentUser: (_, args, { cache }) => {
        return cache.readFragment({ CurrentUserFragment, userID })
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
