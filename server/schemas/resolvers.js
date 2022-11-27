// var { expressjwt: jwt } = require("express-jwt");
var jwt = require("jsonwebtoken");
const { Schema, model } = require('mongoose');
const { User, Auth, bookSchema } = require('../models');

const resolvers = {
    Query: {
        me: async (parent,args,context) => {
            // console.log("gettting me");
            // console.log("args: ",args);
            // console.log(context);
            // console.log("user id ",context.user._id);
            if(!context){
                throw new Error("Not authd");
            }
            // let t = await Auth.findOne({user: context.user._id});
            let temp = await User.findById(context.user._id,"username email savedBooks");
            // console.log("WHAT BE RETURNED  ",temp);
            return temp;
        },
        users: async(parent,args,context) =>{
            // console.log("all users ",context);
            return await User.find({});
        }


    },
    Mutation:{
        addUser: async (parent,args,context) =>{
            // email=email.trim().toLowerCase();
            // console.log("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
            // console.log("Args add",args);
            let tUser = await User.create({username: args.username,email: args.email,password: args.password});
            // console.log("Created user ",tUser);
            let tToken = jwt.sign({id: tUser._id,email: args.email}, 'concat',{expiresIn: '1d'});
            // console.log("Created Token ",tToken);
            let auth = await Auth.create({token: tToken,user: tUser});
            // console.log("Created Auth ",auth);
            // context=tUser;
            return tToken;
        },
        login: async (parent,args,context) =>{
            // console.log("email ",email);
            // console.log("args ",args);
            // console.log("context ",context);
            let check = await User.findOne({email: args.email});
            // console.log("check ",check);
            if (!check){
                // console.log("in fail");
                return {message: "failed"};
            }
            let pcheck = await check.isCorrectPassword(args.password);
            // console.log("pcheck ",pcheck);
            if(!pcheck){
                return {message: "failed"};
            }
            // console.log(check._id);
            let authC = await Auth.findOne({user: check._id});
            let tToken = jwt.sign({id:check._id,email: check.email}, 'concat',{expiresIn: '1d'});
            // console.log("auth c",authC);
            let temp = await Auth.findByIdAndUpdate(authC._id,{token: tToken},{new:true});
            // console.log("temp: ",temp);
            if(!authC){
                return {messaeg: "failed auth"};
            }
            // console.log(tToken);
            return temp;
        },
        saveBook: async (parent,args,context)=>{
            // console.log("--------------------------SAVED BOOK-------------------------------------");
            // console.log("Context ",context);
            // console.log("Args ",args);
            // console.log("Some parent ",parent);
            if(context && context.user){
                // console.log("Saving books");
                context.user.savedBooks.push({...args});
                // console.log("save me some books ",context.user.savedBooks);
                await context.user.save();
            }
            return {message: "Not Authd logged in"}
            //get current user and save the book to his array
            // let tBook = await 
        },
        removeBook: async (parent,args,context) =>{
            // console.log("Context ",context);
            // console.log("Args ",args);
            // console.log('REMOVEE');
            if(context && context.user){
                // context.user.savedBooks.remove({bookId: context.bookId});
                // await context.user.save();
                await User.findByIdAndUpdate(context.user._id,{
                    $pull:{
                        savedBooks:{
                            bookId: args.bookId
                        }      
                    }
                });
                // console.log(context.user);
            }
            return {message: "Not Authd logged in"}
            //gets current user and removes book
        }

    },

};

module.exports = resolvers;
