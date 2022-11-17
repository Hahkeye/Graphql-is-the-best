const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

    type Query{
        users: [User]
        
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): User
        
    }



`;

module.exports = typeDefs;
