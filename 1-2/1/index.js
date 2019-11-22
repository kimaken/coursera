/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    let words = tweet.split(' ');
    return words
        .filter(function(elem) {
            return elem.startsWith('#');
        })
        .map(function(elem) {
            return elem.slice(1);
        });
};
