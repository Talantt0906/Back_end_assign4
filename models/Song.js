const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    year: Number,
    genre: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);