const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // which post commented
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //refernce to postmodel
  },

  //posted user name
  user: {
    type: String,
    required: true,
  },

  //content of comment
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
