const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphqlError } = require('graphql');
const path = require('path');
const {typeDefs, resolvers} = require("./schemas");
const db = require('./config/connection');
const { Auth, User } = require('./models');
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

//check if user exists
async function getUser(tok){
  // console.log("In get user");
  try{
    // console.log("Find Auth by token");
    // console.log("By token: ",tok);
    let c = await Auth.findOne({token: tok});
    if(!c){
      // console.log("Breakding because none found");
      return null;
    }
    if(c){
      // console.log("FInding user after found auth");
      let user = await User.findById(c.user);
      // console.log("User found after searching ",user);
      return user;
    }
    // console.log("User: ",user);
    
  }catch(err){
    console.log(err);
  }
}


async function starts(){
  const { url } = await startStandaloneServer(server, {
      context: async ({req,res}) => {
        // console.log("Setting context");
        const token = req.headers.authorization;
        const user = await getUser(token);
        // console.log("Context header: ",req.headers);
        // console.log("Context token: ",token);
        // console.log("USER : ",user);
        return { user };
      }
    }

  );
  // if (process.env.NODE_ENV === 'production') {
  //   console.log("we proding");
  //   app.use(express.static(path.join(__dirname, '../client/build')));
  // }
  
  // app.use(express.static(path.join(__dirname, '../client/public/')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  // app.use(express.static(path.join(__dirname, '../client/build')));


  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Front end listening on http://localhost:${PORT}`));
    console.log("Apollo Listening on http://localhost:4000");
  });

  // console.log(url);
}

starts();

