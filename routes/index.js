const express = require('express');
const utils = require('../controllers/middlewares/utils');
const index = require('../controllers/index');

const router = express.Router();

// Get Homepage
router.get('/', utils.ensureAuthenticated, index);

module.exports = router;
