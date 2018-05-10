const mongoose = require('mongoose');

module.exports = mongoose.model('Gamble', new mongoose.Schema({
    tag: String,
    discordId: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        index: true
    },
    lastUpdated: { type: Date, default: Date.now },
    profit: { type: Number, default: 0 },
    totalWagered: { type: Number, default: 0 }
}));
