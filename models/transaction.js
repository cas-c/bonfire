const mongoose = require('mongoose');

module.exports = mongoose.model('Transaction', new mongoose.Schema({
    from: String,
    to: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    pending: Boolean
}))