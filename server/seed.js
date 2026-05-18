require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');
const Admin = require('./models/Admin');
const ContactMessage = require('./models/ContactMessage');

const menuItems = [
  // COFFEE
  {
    name: 'Espresso',
    description: 'A rich and bold single shot of our signature house blend. Roasted to perfection for a balanced, nutty flavor.',
    price: 120,
    category: 'coffee',
    featured: true,
  },
  {
    name: 'Doppio Espresso',
    description: 'Double shot of our signature house blend for that extra morning kick.',
    price: 180,
    category: 'coffee',
  },
  {
    name: 'Macchiato',
    description: 'A shot of espresso marked with a dollop of perfectly textured milk foam.',
    price: 140,
    category: 'coffee',
  },
  {
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk. A balanced, smooth Spanish classic.',
    price: 160,
    category: 'coffee',
  },
  {
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and velvety foam. Dusted with cocoa upon request.',
    price: 150,
    category: 'coffee',
  },
  {
    name: 'Flat White',
    description: 'Double ristretto with perfectly textured microfoam for a smooth, creamy finish.',
    price: 160,
    category: 'coffee',
  },
  {
    name: 'Caffè Latte',
    description: 'A smooth blend of espresso and lightly frothed milk.',
    price: 180,
    category: 'coffee',
  },
  {
    name: 'Americano',
    description: 'Espresso poured over hot water for a smooth, elongated coffee experience.',
    price: 130,
    category: 'coffee',
  },
  {
    name: 'Mocha',
    description: 'Espresso blended with rich, artisanal dark chocolate and steamed milk.',
    price: 210,
    category: 'coffee',
  },
  {
    name: 'Cold Brew',
    description: 'Our house blend steeped for 18 hours for a smooth, low-acid, refreshing finish.',
    price: 180,
    category: 'coffee',
    featured: true,
  },
  {
    name: 'Nitro Cold Brew',
    description: 'Our signature cold brew infused with nitrogen for a creamy, stout-like texture.',
    price: 220,
    category: 'coffee',
  },
  {
    name: 'Pour Over (V60)',
    description: 'Single-origin beans meticulously hand-poured for a clean, nuanced cup.',
    price: 250,
    category: 'coffee',
  },
  {
    name: 'French Press',
    description: 'Coarse-ground coffee immersed in hot water for a full-bodied, robust flavor.',
    price: 200,
    category: 'coffee',
  },
  {
    name: 'Filter Coffee',
    description: 'Traditional South Indian filter coffee brewed with chicory for a bold taste.',
    price: 100,
    category: 'coffee',
  },
  {
    name: 'Matcha Latte',
    description: 'Ceremonial grade Japanese matcha whisked with perfectly steamed milk.',
    price: 240,
    category: 'coffee',
  },
  {
    name: 'Seasonal Spice Latte',
    description: 'Our classic latte with a rotating house-made seasonal syrup (e.g. Cinnamon, Hazelnut).',
    price: 200,
    category: 'coffee',
  },
  {
    name: 'Iced Caramel Macchiato',
    description: 'Vanilla syrup, cold milk, and ice topped with espresso and a caramel drizzle.',
    price: 230,
    category: 'coffee',
  },
  // FOOD
  {
    name: 'Artisan Avocado Toast',
    description: 'Smashed Hass avocado, chili flakes, sea salt, and microgreens on toasted sourdough.',
    price: 260,
    category: 'food',
    featured: true,
  },
  {
    name: 'Eggs Benedict',
    description: 'Perfectly poached eggs, house hollandaise, and smoked ham on a toasted English muffin.',
    price: 320,
    category: 'food',
  },
  {
    name: 'Smoked Salmon Bagel',
    description: 'Toasted everything bagel with cream cheese, smoked salmon, capers, and red onion.',
    price: 350,
    category: 'food',
  },
  {
    name: 'Banana Pecan Pancakes',
    description: 'Fluffy buttermilk pancakes topped with caramelized bananas, roasted pecans, and maple syrup.',
    price: 280,
    category: 'food',
  },
  {
    name: 'Urban Club Sandwich',
    description: 'Triple-decker sandwich with roasted chicken, crispy bacon, lettuce, tomato, and garlic aioli.',
    price: 310,
    category: 'food',
  },
  {
    name: 'Truffle Mushroom Toast',
    description: 'Sautéed wild mushrooms, thyme, and a drizzle of truffle oil on toasted sourdough.',
    price: 290,
    category: 'food',
  },
  {
    name: 'Mediterranean Quinoa Bowl',
    description: 'Quinoa, cherry tomatoes, cucumber, kalamata olives, feta cheese, and a lemon vinaigrette.',
    price: 340,
    category: 'food',
  },
  {
    name: 'Berry Granola Parfait',
    description: 'House-made honey granola layered with Greek yogurt and seasonal mixed berries.',
    price: 220,
    category: 'food',
  },
  {
    name: 'Classic Croissant',
    description: 'Flaky, buttery French pastry baked fresh daily.',
    price: 150,
    category: 'food',
  },
  {
    name: 'Almond Croissant',
    description: 'Twice-baked croissant filled with sweet almond frangipane and topped with sliced almonds.',
    price: 190,
    category: 'food',
  },
  // DESSERTS
  {
    name: 'Classic Tiramisu',
    description: 'Authentic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa.',
    price: 260,
    category: 'desserts',
    featured: true,
  },
  {
    name: 'Molten Lava Cake',
    description: 'Warm, rich chocolate cake with a gooey molten center, served with vanilla bean ice cream.',
    price: 280,
    category: 'desserts',
  },
  {
    name: 'New York Cheesecake',
    description: 'Dense, creamy New York style cheesecake topped with a tart mixed berry compote.',
    price: 240,
    category: 'desserts',
  },
  {
    name: 'Espresso Affogato',
    description: "A generous scoop of premium vanilla bean ice cream 'drowned' in a hot shot of espresso.",
    price: 210,
    category: 'desserts',
  },
  {
    name: 'Lemon Tart',
    description: 'Buttery tart shell filled with a tangy, smooth lemon curd and dusted with powdered sugar.',
    price: 230,
    category: 'desserts',
  },
  {
    name: 'Salted Caramel Brownie',
    description: 'Fudgy dark chocolate brownie topped with flaky sea salt and a generous caramel drizzle.',
    price: 180,
    category: 'desserts',
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();
    await Admin.deleteMany();
    await ContactMessage.deleteMany();

    await MenuItem.insertMany(menuItems);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    await Admin.create({
      username: 'admin',
      passwordHash,
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
