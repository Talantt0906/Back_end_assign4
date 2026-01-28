const express = require('express');
const songController = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', songController.getAllSongs);

router.post('/', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  songController.createSong
);

router.delete('/:id', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  songController.deleteSong
);

module.exports = router;