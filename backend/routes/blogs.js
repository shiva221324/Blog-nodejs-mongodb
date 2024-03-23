const express = require("express");
const router = express.Router();

//Import controllers
const {
  createComment,
  deleteComment,
} = require("../contollers/commentController");
const { createPost, getallposts } = require("../contollers/postController");
const { likePost, unlikePost } = require("../contollers/likeController");

router.post("/comments/create", createComment);
router.post("/comments/delete", deleteComment);
router.post("/posts/create", createPost);
router.get("/posts", getallposts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
module.exports = router;
