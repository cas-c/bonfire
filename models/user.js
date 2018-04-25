const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    tag: String,
    discordId: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        index: true
    },
    lastUpdated: { type: Date, default: Date.now },
    balance: { type: Number, default: 0 }
}))