const { auctions } = require('../models/auctionModel');

const getAuctions = (req, res) => {
    res.json(auctions);
};

const createAuction = (req, res) => {
    const { item, startingBid, author } = req.body;
    const newAuction = {
        id: auctions.length + 1,
        item,
        highestBid: startingBid,
        highestBidder: author,
        author,
    };
    auctions.push(newAuction);
    res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
};

module.exports = { getAuctions, createAuction };
