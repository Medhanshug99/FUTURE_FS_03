# Urban Roast Café

A full-stack (MERN) web application built for a boutique café based in Hyderabad. This project features a completely custom, recruiter-grade React frontend (no templates or generic UI frameworks like Tailwind/Bootstrap used) and a secure Node.js/Express backend.

## 🚀 Live Demo
- **Frontend (Vercel):** [Coming Soon]
- **Backend (Render):** [Coming Soon]

## 🛠️ Tech Stack
- **Frontend:** React 18 (Vite), React Router v6, Axios, Framer Motion, CSS Modules
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Utilities:** Nodemailer (for contact form emails), bcrypt

## ✨ Features
- **Public Site:**
  - Modern, editorial, mobile-first responsive design.
  - Dynamic Menu fetched from MongoDB with instant client-side category filtering.
  - Working Contact Form that saves messages to the database and emails the admin.
  - Custom animations via Framer Motion.
- **Admin Panel:**
  - Secure JWT authentication.
  - Menu Manager: View and toggle item availability (Sold Out vs Available).
  - Messages Dashboard: Read customer inquiries from the contact form and mark them as read.

## 💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/urban-roast.git
cd urban-roast
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/urbanroast
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin_receiving_address@gmail.com
```
Run the Database Seed Script (Make sure MongoDB is running):
```bash
node seed.js
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Create a `.env` file in the `/client` directory:
```env
VITE_API_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```

## 📚 API Endpoints
**Public Routes:**
- `GET /api/menu` - Fetch all menu items
- `GET /api/menu/featured` - Fetch 3 featured items
- `GET /api/menu/category/:category` - Fetch items by category
- `POST /api/contact` - Submit contact form

**Protected Admin Routes (Requires Bearer Token):**
- `POST /api/admin/login` - Authenticate admin
- `GET /api/admin/messages` - Fetch all contact submissions
- `PATCH /api/admin/messages/:id` - Mark message as read
- `PATCH /api/menu/:id/toggle` - Toggle menu item availability

## 📝 License
This project is licensed under the MIT License.
