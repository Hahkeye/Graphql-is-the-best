const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphqlError } = require('graphql');
const path = require('path');

// const routes = require('./routes');

const {typeDefs, resolvers} = require("./schemas");
const db = require('./config/connection');
const { Auth, User } = require('./models');
const PORT = process.env.PORT || 3001;




const server = new ApolloServer({
  typeDefs,
  resolvers
});

//check if user exists
async function getUser(tok){
  console.log("Token: ",tok);
  if(!tok) return {message: "Failed Token Not present"};
  try{
    let c = await Auth.findOne({token: tok});
    console.log("Does this token live in auth? ",c);
    if(!c) return {message: "Failed Fake token"};
    let user = await User.findById(c.user);
    // console.log(user);
    return user;
  }catch(err){
    console.log(err);
  }
}


async function starts(){
  const { url } = await startStandaloneServer(server, {
      context: async ({req,res}) => {
        const token = req.headers.authorization || '';
        // console.log(token);
        const user = await getUser(token);
        // if (!user){
        //   throw new GraphqLError('User is not authenticated', {
        //     extensions: {
        //       code: 'UNAUTHENTICATED',
        //       http: { status: 401 },
        //     },
        //   });
        // }
        return {user};
      }
    }

  );

  console.log(url);
}

starts();
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



// const startApollo = async (typeDefs,resolvers) => {
//   await server.start();
//   server.applyMiddleware({app});
//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//   }
  
//   db.once('open', () => {
//     app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}/graphql`));
//   });
  
// }


// startApollo(typeDefs,resolvers);
// if we're in production, serve client/build as static assets
