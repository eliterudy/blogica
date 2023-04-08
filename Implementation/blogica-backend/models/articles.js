const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      default: "",
    },
    number_of_likes: {
      type: Number,
      default: 0,
    },
    number_of_views: {
      type: Number,
      default: 0,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

var Articles = mongoose.model("Article", articleSchema);

module.exports = Articles;
