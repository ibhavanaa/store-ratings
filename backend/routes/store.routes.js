const express = require('express');
const router = express.Router();
const { createStore, getAllStores, getRatingsByOwner, getTopRatedStores } = require('../controllers/store.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('ADMIN'), createStore);
router.get('/', getAllStores);
router.get('/ratings', authenticate, authorize('OWNER'), getRatingsByOwner);
router.get('/top-rated', getTopRatedStores);

module.exports = router;