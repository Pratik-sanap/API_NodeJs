const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ success: false, data: null, error: 'Email and password required' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(422).json({ success: false, data: null, error: 'Email already registered' });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ success: true, data: { id: user._id, email: user.email }, error: null });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ success: false, data: null, error: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, data: null, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, data: { token }, error: null });
  } catch (err) {
    next(err);
  }
};
