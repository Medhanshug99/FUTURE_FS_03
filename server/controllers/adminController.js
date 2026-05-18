const Admin = require('../models/Admin');
const ContactMessage = require('../models/ContactMessage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/admin/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};

// @desc    Mark message as read
// @route   PATCH /api/admin/messages/:id
// @access  Private
const markMessageRead = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (message) {
      message.read = true;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating message' });
  }
};

module.exports = { loginAdmin, getMessages, markMessageRead };
