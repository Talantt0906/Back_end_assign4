require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const songRoutes = require('./routes/songRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ DB Error:", err));

app.use('/api/auth', authRoutes);     
app.use('/api/songs', songRoutes);    
app.use('/api/reviews', reviewRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});