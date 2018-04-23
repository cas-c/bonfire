const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    tag: String,
    discordId: String,
    lastUpdated: { type: Date, default: Date.now },
    balance: { type: Number, default: 0 }
}))