const express =  require('express');

const { signup, login } = require('../controllers/authControllers')

const router = express.Router();

// sign up route
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;