var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var badgeSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
  count: {
    type: Number,
    default: "",
  },
});

// adds support for username and password from passport-local-mongoose package
badgeSchema.plugin(passportLocalMongoose);

var Badges = mongoose.model("Badge", badgeSchema);
module.exports = Badges;
