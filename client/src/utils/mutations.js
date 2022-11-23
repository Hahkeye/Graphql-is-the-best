import {gql, useMutation} from "@apollo/client";

const LOGIN_USER = gql`

mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        password
      }
    }
  }
`;

const ADD_USER = gql`

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


const SAVE_BOOK = gql`

mutation SaveBook($description: String!, $title: String!, $bookId: String!, $image: String!, $link: String!) {
    saveBook(description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
      savedBooks {
        authors
        bookId
        title
        image
        link
      }
    }
  }
  
`;

const REMOVE_BOOK = gpl`



mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      savedBooks {
        bookId
      }
    }
  }



`

module.exports = {
    LOGIN_USER,
    ADD_USER,
    SAVE_BOOK,
    REMOVE_BOOK
}