const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({},"username email savedBooks");
        }
    },
    Mutation:{
        addUser: async (parent, {username,email,password}) =>{
            // console.log(username);
            // console.log(email);
            // console.log(password);
            // let test = await User.create({username,email,password})
            // console.log(test);
            return await User.create({username,email,password})
        }

    },

};
// Mutation:{

// },

module.exports = resolvers;
