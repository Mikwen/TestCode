const express = require('express');
const lectures = require('../controllers/lecture');

const router = express.Router();

// Register lecture
router.post('/lecture', lectures.create);

router.get('/lecture', lectures.getLecture);
