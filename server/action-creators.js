function createNumberAction(number) {
    return JSON.stringify({
        type: 'number',
        payload: {number}
    });
} 

function createDisconnectAction(err) {
    return JSON.stringify({
        type: 'disconnect',
        payload: {err}
    })
}

module.exports = { createDisconnectAction, createNumberAction}