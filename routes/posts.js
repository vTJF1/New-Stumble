const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get posts with sorting option
router.get('/', async (req, res) => {
  const { sort } = req.query;   // gets the sort query parameters

  let sortBy = {};

  switch (sort) {
    case 'oldest':
      sortBy = { createdAt: 1 };  //oldest first
      break;
    case 'liked':
      sortBy = { likes: -1 };  // most liked posts
      break;
    case 'disliked':
      sortBy = { dislikes: -1 };  // most disliked posts
      break;
    default:
      sortBy = { createdAt: -1 };  //deault is most recent 
  }

  try {
    console.log(`Fetching posts sorted by: ${sortBy}`);
    const posts = await Post.find().sort(sortBy);  // apply the sort
    res.json(posts); 
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

//adding new posts
router.post('/', async (req, res) => {
  const { username, content } = req.body;
  try {
    const newPost = new Post({ username, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) { 
    console.error('Failed to save post:', err);
    res.status(400).json({ error: 'Failed to save post' });
  }
});

//this is for like and dislike
//it allows users to remove their reacts as well as swap
router.post('/:id/react', async (req, res) => {
  const { reaction, username } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    const liked = post.likedBy.includes(username);
    const disliked = post.dislikedBy.includes(username);

    if (reaction === 'like') {
      if (liked) {
       //undo
        post.likes -= 1;
        post.likedBy = post.likedBy.filter(user => user !== username);
      } else {
        // Remove dislikes
        if (disliked) {
          post.dislikes -= 1;
          post.dislikedBy = post.dislikedBy.filter(user => user !== username);
        }
        // Add like
        post.likes += 1;
        post.likedBy.push(username);
      }
    } else if (reaction === 'dislike') {
      if (disliked) {
        // Undo dislike
        post.dislikes -= 1;
        post.dislikedBy = post.dislikedBy.filter(user => user !== username);
      } else {
        // Remove like if it exists
        if (liked) {
          post.likes -= 1;
          post.likedBy = post.likedBy.filter(user => user !== username);
        }
        // Add dislike
        post.dislikes += 1;
        post.dislikedBy.push(username);
      }
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error('Reaction error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
