const router = require('express').Router();

const { User, Transaction } = require('../models');
const { catchAsync } = require('../utils');

router.get('/', catchAsync(async (req, res) => {
    const transactions = await Transaction.find({});
    res.json(transactions);
}));

router.post('/', catchAsync(async (req, res) => {
    const giver = await User.findOne({ discordId: req.body.giverId });
    const receiver = await User.findOne({ discordId: req.body.receiverId });
    if (!giver) {
        res.json({
            success: false,
            message: `User ${req.body.giverId} does not exist in our database.`,
            code: 'NO_USER_GIVER'
        });
        return;
    } else if (!receiver) {
        res.json({
            success: false,
            message: `User ${req.body.receiverId} does not exist in our database.`,
            code: 'NO_USER_RECEIVER'
        });
        return;
    }
    if (giver.balance < req.body.amount) {
        res.json({
            success: false,
            message: `User ${giver.tag} does not have enough funds for this transaction.`,
            code: 'TOO_BROKE_LOL'
        });
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

    res.json({
        success: true,
        message: `${giver.tag} has given ${receiver.tag} ${req.body.amount} souls.`,
        code: 'SUCCESSFUL_TRANSFER'
    });
    return;
}));


module.exports = router;
