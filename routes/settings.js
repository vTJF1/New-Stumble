/* routes/settings.js
const express = require('express');
const Settings = require('../models/Setting');
const router = express.Router();

// Fetch user settings
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    let settings = await Settings.findOne({ userId });

    // If no settings found, return defaults
    if (!settings) {
      settings = new Settings({ userId });
      await settings.save();
    }

    res.json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/update user settings
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Update or create new settings
    const updatedSettings = await Settings.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json(updatedSettings);
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
*/

//this is the route end of the setting attempt when I tried to link settings to the mongodb