const express =  require('express');

const { createTask, getMyTask, getAllTask} = require('../controllers/taskController')

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

router.post('/', protect, createTask);
router.get('/me', protect, getMyTask);
router.get('/all', protect, authorize(['admin']),getAllTask);

module.exports = router
