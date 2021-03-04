const round = (number, decimalAfterPoint) => {
    let rounder = 10 ** decimalAfterPoint;
    return Math.round(number * rounder) / rounder;
};

module.exports = round;