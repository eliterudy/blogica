var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
  badges: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
    default: [],
  },
  favorites: {
    articles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
      default: [],
    },
  },
  published: {
    articles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
      default: [],
    },
  },
  recents: {
    articles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
      default: [],
    },
  },
});

// adds support for username and password from passport-local-mongoose package
userSchema.plugin(passportLocalMongoose);

var Users = mongoose.model("User", userSchema);
module.exports = Users;
