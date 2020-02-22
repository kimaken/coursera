/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    let isResult = false;

    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        isResult = true;
    }

    return isResult;
};
