const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get venues' });
  }
});

// search venue by its name
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const venues = await Venue.find({ name: new RegExp(query, 'i') });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search venues' });
  }
});

// get a single venue with comment
router.get('/:venueId', async (req, res) => {
  const { venueId } = req.params;
  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
});

// allows users to post a comment on a venue
router.post('/:venueId/comments', async (req, res) => {
  const { venueId } = req.params;
  const { username, content } = req.body;
  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });

    const newComment = { username, content, createdAt: new Date() };
    venue.comments.push(newComment);
    await venue.save();

    const updatedVenue = await Venue.findById(venueId);
    res.status(201).json(updatedVenue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});






module.exports = router;
