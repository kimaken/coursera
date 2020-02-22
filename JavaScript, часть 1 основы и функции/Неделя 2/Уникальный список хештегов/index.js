/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    if (!hashtags.length) {
        return '';
    }

    let resultHashtags = [];

    for (let i = 0; i < hashtags.length; i++) {
        if (resultHashtags.indexOf(hashtags[i].toLowerCase()) === -1) {
            resultHashtags.push(hashtags[i].toLowerCase());
        } else {
            continue;
        }
    }

    return resultHashtags.join(', ');
};
