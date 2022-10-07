var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var badgeSchema = new Schema({
  title: {
    type: String,
    default: "",
    required: true,
  },
  image_url: {
    type: String,
    default: "",
    required: true,
  },
  currency: {
    type: Number,
    required: true,
    default: 0,
  },
});

// adds support for username and password from passport-local-mongoose package
badgeSchema.plugin(passportLocalMongoose);

var Badges = mongoose.model("Badge", badgeSchema);
module.exports = Badges;
