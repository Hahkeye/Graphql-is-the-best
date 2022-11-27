import { gql } from "@apollo/client";

export const LOGIN_USER = gql`

mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`

mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        email
        username
        password
      }
    }
  }
`;


export const SAVE_BOOK = gql`

mutation SaveBook($description: String!, $title: String!, $bookId: String!,$image: String!,$authors: [String]) {
  saveBook(description: $description, title: $title, bookId: $bookId, image: $image, authors: $authors) {
    savedBooks {
      authors
      bookId
      title
      image
      description
    }
  }
}
`;

export const REMOVE_BOOK = gql`



mutation Mutation($bookId: String!) {
  removeBook(bookId: $bookId) {
    savedBooks {
      bookId
    }  
  }
}



`;


// module.exports = {
//     LOGIN_USER,
//     ADD_USER,
//     SAVE_BOOK,
//     REMOVE_BOOK
// }