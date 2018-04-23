const catchAsync = fn => (
    (req, res, next) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => next(err));
        }
    }
);

const getToken = header => header.match(/Firekeeper\s((.*)\.(.*)\.(.*))/)[1];

module.exports = {
    catchAsync,
    getToken
};
