const router = require('express').Router();

const { User, Transaction } = require('../models');
const { catchAsync, responses } = require('../utils');


router.get('/', catchAsync(async (req, res) => {
    const transactions = await Transaction.find({});
    res.json(transactions);
}));

router.post('/', catchAsync(async (req, res) => {
    const giver = await User.findOne({ discordId: req.body.giverId });
    const receiver = await User.findOne({ discordId: req.body.receiverId });
    if (!giver) {
        res.json(responses([req.body.giverId])('NO_USER_GIVER'));
        return;
    } else if (!receiver) {
        res.json(responses([req.body.receiverId])('NO_USER_RECEIVER'));
        return;
    }
    if (giver.balance < req.body.amount) {
        res.json(responses([giver.tag])('TOO_BROKE_LOL'));
        return;
    }
    const trans = new Transaction({
        from: req.body.giverId,
        to: req.body.receiverId,
        amount: req.body.amount,
        pending: true
    });
    await trans.save();

    giver.set({ balance: giver.balance - req.body.amount });
    await giver.save();

    receiver.set({ balance: receiver.balance + req.body.amount });
    await receiver.save();

    trans.set({ pending: false });
    await trans.save();

    res.json(responses(giver.tag, receiver.tag, req.body.amount)('SUCCESSFUL_TRANSFER'));
    return;
}));


module.exports = router;
