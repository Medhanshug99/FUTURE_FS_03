const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      message,
    });

    // Send email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Request from ${name}`,
        html: `
          <h3>New Message from Urban Roast Cafe Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email could not be sent', emailError);
      // We still return 201 because the message was saved in the DB
    }

    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit message', error: error.message });
  }
};

module.exports = { submitMessage };
