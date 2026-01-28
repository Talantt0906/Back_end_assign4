const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role 
    });
    const token = signToken(newUser._id);
    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter your email address and password.' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
};