const express = require('express');
const router = express.Router();
const { rateStore } = require('../controllers/rating.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/:storeId', authenticate, authorize('USER'), rateStore);

module.exports = router;