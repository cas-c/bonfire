const router = require('express').Router();
const { catchAsync, responses } = require('../utils');
const { Gamble, Bank, User } = require('../models');

router.get('/', catchAsync(async (req, res) => {
    const bank = await Bank.findOne({});
    const gambles = await Gamble.find({});
    res.json(Object.assign({}, bank, gambles));
}))

router.post('/clear', catchAsync(async (req, res) => {
    await Gamble.remove({});
    const bank = await Bank.findOne({});
    bank.set({ balance: 0 });
    await bank.save();
    res.json({ 'OK': 'DONE' })
}))

router.post('/', catchAsync(async (req, res) => {
    const gambler = await User.findOne({ discordId: req.body.gamblerId });
    const gUser = await Gamble.findOne({ discordId: req.body.gamblerId });
    let bank = await Bank.findOne({});   
    if (!gUser) {
        const newGambler = new Gamble({
            discordId: req.body.gamblerId,
            tag: req.body.gamblerTag,
            profit: req.body.balance,
            totalWagered: req.body.wagered
        });
        await newGambler.save();
    } else {
        gUser.set({
            profit: req.body.balance - gambler.balance + gUser.profit,
            totalWagered: gUser.totalWagered + req.body.wagered
        });
        await gUser.save();
    }
    gambler.set({ balance: req.body.balance });
    await gambler.save();
    bank.set({ balance: bank.balance + 50 });
    await bank.save();
    res.json(responses()('SUCCESSFUL_GAMBLE'));
    return;
}));

module.exports = router;
