

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth();
}

module.exports = isSameDay;