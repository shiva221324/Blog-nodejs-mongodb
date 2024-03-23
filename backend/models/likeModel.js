const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  // which post liked
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  //liked username
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
