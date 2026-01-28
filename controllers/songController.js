const Song = require('../models/Song');

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};