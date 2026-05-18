const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['coffee', 'food', 'desserts'],
    },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
