const express = require('express');
const { getAuctions, createAuction } = require('../controllers/auctionController');

const router = express.Router();

router.get('/', getAuctions);
router.post('/create', createAuction);

module.exports = router;
