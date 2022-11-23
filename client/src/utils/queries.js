import {gql, useQuery} from "@apollo/client";

const GET_ME = gql`

query meStuff{
    me {
        email
        username
        saveBooks
    }
}


`;



module.exports = {
    GET_ME
}