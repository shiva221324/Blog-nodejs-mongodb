//import required models
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save another way of inserting
    const savedComment = await comment.save();

    //find post Id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postid, commentid } = req.body;

    const deletedComment = await Comment.findByIdAndDelete({
      post: postid,
      _id: commentid,
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postid,
      {
        $pull: { comments: commentid },
      },
      { new: true }
    );
    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error while deleting comment",
    });
  }
};
