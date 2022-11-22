const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');
const { User } = require("./User");
// const bookSchema = require('./User');

const authSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Auth = model('Auth', authSchema);

module.exports = Auth;
