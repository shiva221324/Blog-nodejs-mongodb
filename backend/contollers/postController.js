const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedpost = await post.save();
    res.json({
      post: savedpost,
    });
  } catch (err) {
    res.status(400).json({ error: "error bro" });
  }
};

exports.getallposts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({ posts: posts });
  } catch (err) {
    res.status(400).json({ error: "error bro" });
  }
};
