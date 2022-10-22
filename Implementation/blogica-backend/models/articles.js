const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      default: "",
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    numberOfViews: {
      type: Number,
      default: 0,
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
