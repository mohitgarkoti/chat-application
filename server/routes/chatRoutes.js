const express = require('express');
const { getWelcomeMessage } = require('../controllers/chatController');

const router = express.Router();
router.get('/', getWelcomeMessage);

module.exports = router;
