const express = require('express');
const router = express.Router();
const { submitMessage } = require('../controllers/contactController');

router.route('/').post(submitMessage);

module.exports = router;
