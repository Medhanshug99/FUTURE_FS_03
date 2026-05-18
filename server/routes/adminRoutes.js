const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getMessages,
  markMessageRead,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/messages', protect, getMessages);
router.patch('/messages/:id', protect, markMessageRead);

module.exports = router;
