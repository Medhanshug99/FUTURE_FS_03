const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({}).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching menu items' });
  }
};

// @desc    Get featured menu items
// @route   GET /api/menu/featured
// @access  Public
const getFeaturedItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ featured: true }).limit(3);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching featured items' });
  }
};

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
const getItemsByCategory = async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching items' });
  }
};

// @desc    Add new menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid item data', error: error.message });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid item data' });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting item' });
  }
};

// @desc    Toggle item availability
// @route   PATCH /api/menu/:id/toggle
// @access  Private/Admin
const toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (item) {
      item.available = !item.available;
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating availability' });
  }
};

module.exports = {
  getMenuItems,
  getFeaturedItems,
  getItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
};
