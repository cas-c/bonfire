const switcher = cases => defaultCase => key => cases.hasOwnProperty(key) ? cases[key]() : defaultCase;

const responses = args => response_code => {
    return switcher({
        'GO_AWAY': () => ({
            success: false,
            message: 'Not authenticated.',
            code: 'GO_AWAY'
        }),
        'NO_USER_GIVER': () => ({
            success: false,
            message: `User ${args[0]} does not exist in our database.`,
            code: 'NO_USER_GIVER'
        }),
        'NO_USER_RECEIVER': () => ({
            success: false,
            message: `User ${args[0]} does not exist in our database.`,
            code: 'NO_USER_RECEIVER'
        }),
        'TOO_BROKE_LOL': () => ({
            success: false,
            message: `User ${args[0]} does not have enough funds for this transaction.`,
            code: 'TOO_BROKE_LOL'
        }),
        'SUCCESSFUL_TRANSFER': () => ({
            success: true,
            message: `${args[0]} has given ${args[1]} ${args[2]} souls.`,
            code: 'SUCCESSFUL_TRANSFER'
        })
    })({
        success: false,
        message: 'Error returning response.',
        code: 'RESPONSE_NOT_FOUND'
    })(response_code);
};


module.exports = responses;
