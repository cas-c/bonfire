const mongoose = require('mongoose');

module.exports = mongoose.model('Bank', new mongoose.Schema({
    balance: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}));
