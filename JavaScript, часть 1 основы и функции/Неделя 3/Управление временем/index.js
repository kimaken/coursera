let obj = {};
let regExp = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/;

obj.add = function (num, type) {
    if (this.date[type] === undefined || num < 0) {
        throw new TypeError('Переданы некоректные аргументы: ' + num + ', ' + type);
    }

    this.date[type] += num;

    return this;
};

obj.subtract = function (num, type) {
    if (this.date[type] === undefined || num < 0) {
        throw new TypeError('Переданы некоректные аргументы: ' + num + ', ' + type);
    }

    this.date[type] -= num;

    return this;
}

Object.defineProperty(obj, 'value', {
    get: function () {
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return (new Date(this.date.years, this.date.months - 1, this.date.days, this.date.hours, this.date.minutes)).toLocaleString('arab', options);
    }
});

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

    let parsedDate = date.match(regExp);

    obj.date = {
        years: Number(parsedDate[1]),
        months: Number(parsedDate[2]),
        days: Number(parsedDate[3]),
        hours: Number(parsedDate[4]),
        minutes: Number(parsedDate[5])
    }

    return obj;
};
