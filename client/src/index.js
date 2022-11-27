import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
// import { useQuery } from '@apollo/client';

// const { GET_ME } = require("./utils/queries");
const link = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin'
});


const authLink = setContext((_, { headers }) =>{
  const token = localStorage.getItem("id_token")//grab it from local you also need to set it in local
  console.log({
    ...headers,
    authorization: token
  });

  return {
    headers:{
      ...headers,
      authorization: token
    }
  }
});

// const authLink = setContext((request,prevContext)=>({
//   headers: {auhtorization: localStorage.getItem("id_token")},

// }));




const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});

// console.log(client);

// const { loading, error, data} = useQuery(GET_ME);
ReactDOM.render(
  <ApolloProvider client={client}>
    {/* {console.log(client)} */}
    {/* {data} */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
