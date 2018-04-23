const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const responses = require('./responses');


const catchAsync = fn => (
    (req, res, next) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => next(err));
        }
    }
);

const getToken = header => header.match(/Firekeeper\s((.*)\.(.*)\.(.*))/);

// Middleware
const isAuthed = (req, res, next) => {
    if (!req.headers.authorization) {
        res.json(responses()('GO_AWAY'));
        return;
    }
    const tokenMatches = getToken(req.headers.authorization);
    if (!tokenMatches) {
        res.json(responses()('GO_AWAY'));
        return;
    }
    try {
        jwt.verify(tokenMatches[1], secret);
        return next();
    }
    catch(JsonWebTokenError) {
        res.json(responses()('GO_AWAY'));
        return;
    }
}

module.exports = {
    catchAsync,
    getToken,
    isAuthed,
    responses
};
