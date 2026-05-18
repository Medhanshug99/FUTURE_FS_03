const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getFeaturedItems,
  getItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getMenuItems).post(protect, createMenuItem);
router.route('/featured').get(getFeaturedItems);
router.route('/category/:category').get(getItemsByCategory);
router
  .route('/:id')
  .put(protect, updateMenuItem)
  .delete(protect, deleteMenuItem);
router.route('/:id/toggle').patch(protect, toggleAvailability);

module.exports = router;
