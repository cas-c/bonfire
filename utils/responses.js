const switcher = cases => defaultCase => key => cases.hasOwnProperty(key) ? cases[key]() : defaultCase;

const responses = args => response_code => {
    return switcher({
        'GO_AWAY': () => ({
            success: false,
            message: 'Not authenticated.',
            code: response_code
        }),
        'NO_USER_GIVER': () => ({
            success: false,
            message: `User ${args[0]} does not exist in our database.`,
            code: response_code
        }),
        'NO_USER_RECEIVER': () => ({
            success: false,
            message: `User ${args[0]} does not exist in our database.`,
            code: response_code
        }),
        'TOO_BROKE_LOL': () => ({
            success: false,
            message: `User ${args[0]} does not have enough funds for this transaction.`,
            code: response_code
        }),
        'SUCCESSFUL_TRANSFER': () => ({
            success: true,
            message: `${args[0]} has given ${args[1]} ${args[2]} souls.`,
            code: response_code
        }),
        'INCORRECT_INPUT': () => ({
            success: false,
            message: 'Input not valid for this call.',
            code: response_code
        }),
        'UPDATE_SUCCESSFUL': () => ({
            success: true,
            message: 'Successfully updated user / balance database.',
            code: response_code
        })
    })({
        success: false,
        message: 'Error returning response.',
        code: 'RESPONSE_NOT_FOUND'
    })(response_code);
};


module.exports = responses;
