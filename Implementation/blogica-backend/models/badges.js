var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var badgeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  badge_value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

var Badges = mongoose.model("Badge", badgeSchema);
module.exports = Badges;
