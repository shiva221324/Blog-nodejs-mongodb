//import required models
const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });

    //save another way of inserting
    const savedlike = await like.save();

    //find post Id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedlike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error while liking post",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { postid, likeid } = req.body;

    //delete like using postid and likeid
    // we need need postid and likeid because one post can have multiple likes but one user can like one post one time
    const deletedLike = await Like.findByIdAndDelete({
      post: postid,
      _id: likeid,
    });

    // now we delete in likes array
    const updatedPost = await Post.findByIdAndUpdate(
      postid,
      {
        $pull: { likes: likeid },
      },
      { new: true }
    );
    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error while uniking post",
    });
  }
};
