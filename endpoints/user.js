const router = require('express').Router();
const { User, Transaction } = require('../models');
const { catchAsync, responses } = require('../utils');

const safeReturn = userArray => userArray.map(user => Object.assign({}, { tag: user.tag, balance: user.balance, discordId: user.discordId }));

router.get('/', catchAsync(async (req, res) => {
    const users = await User.find({});
    res.json(safeReturn(users));
}));

router.post('/', catchAsync(async (req, res) => {
    if ((typeof req.body !== 'object' && req.body.length < 1) || Object.keys(req.body).length === 0) {
        res.json(responses()('INCORRECT_INPUT'));
        return;
    }
    const newUsers = req.body;
    const allUsers = await User.find({});
    const userReducer = (accumulator, current) => {
        const existing = allUsers.find(a => a.discordId === current.discordId);
        if (existing) {
            // it's possible for users to change their tags as well as their balance.
            // If nothing's changed, we don't want to waste time updating it.
            if (existing.balance !== current.balance || existing.tag !== current.tag) {
                accumulator.push(current);
            }
        } else {
            nonExistingUsers.push(current);
        }
        return accumulator;
    }
    let nonExistingUsers = [];

    // note -- this is existing users who have changed
    const existingUsers = newUsers.reduce(userReducer, []);
    const awaitEU = existingUsers.map(eu => {
        return User.update({ discordId: eu.discordId }, { '$set': { tag: eu.tag, balance: eu.balance } });
    });
    await Promise.all(awaitEU);
    await User.insertMany(nonExistingUsers);
    res.json(responses()('UPDATE_SUCCESSFUL'));
    // don't think we need to return all users again... we'll see
    // const updatedUsers = await User.find({});
    // res.json(safeReturn(updatedUsers));
    return;
}));

module.exports = router;
