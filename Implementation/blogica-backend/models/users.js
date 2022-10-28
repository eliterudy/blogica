var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var badgeUserSchema = new Schema({
  badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
  count: Number,
});

var userSchema = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
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
    type: [badgeUserSchema],
    default: [],
  },
  saved: {
    articles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
      default: [],
    },
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
  points_earned: {
    type: Number,
    default: 0,
  },
  points_spent: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// adds support for username and password from passport-local-mongoose package
userSchema.plugin(passportLocalMongoose);

var Users = mongoose.model("User", userSchema);
module.exports = Users;
