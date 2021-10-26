function arrayFromLength(number) {
    return Array.from(new Array(number).keys()).map(k => k + 1);
}

function delay(ms) {
    return new Promise(r => setTimeout(() => r(), ms))
}

module.exports = {
    arrayFromLength,
    delay,
}