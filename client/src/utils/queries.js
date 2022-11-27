import {gql} from "@apollo/client";

export const GET_ME = gql`

query meStuff{
  me{
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
    }
  }
}


`;

export const GET_ALL = gql`


query all{
    users{
        username
    }
}



`;