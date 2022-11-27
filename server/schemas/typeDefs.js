// const { gql } = require('graphql-tag');

const typeDefs = `#graphql

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query{
        users: [User]
        me: User
        
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(description: String!, title: String!, bookId: String!,image: String!,authors: [String]): User
        removeBook(bookId: String!): User
    }



`;

module.exports = typeDefs;
