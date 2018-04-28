const router = require('express').Router();
const { catchAsync } = require('../utils');
const { User } = require('../models');

const safeReturn = userArray => userArray.map(user => Object.assign({}, { tag: user.tag, balance: user.balance, discordId: user.discordId }));

router.get('/', catchAsync(async (req, res) => {
    const leaderboard = await User.find({});
    res.json(safeReturn(leaderboard.sort((l, r) => r.balance - l.balance).slice(0, 10)));
}));

module.exports = router;
