const express = require('express');
const course = require('../controllers/course');

const router = express.Router();

router.get('/', course.page);

module.exports = router;
