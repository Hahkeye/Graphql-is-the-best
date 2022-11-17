const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// const routes = require('./routes');

const {typeDefs, resolvers} = require("./schemas");
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const startApollo = async (typeDefs,resolvers) => {
  await server.start();
  server.applyMiddleware({app});
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}/graphql`));
  });
  
}


startApollo(typeDefs,resolvers);
// if we're in production, serve client/build as static assets
