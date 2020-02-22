module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(elems) {
    this._elems = [];
}


// Методы коллекции
Collection.prototype.values = function () {
    return this._elems;
};
// другие методы
Collection.prototype.append = function (elems) {
    if (elems instanceof Collection) {
        this._elems = this._elems.concat(elems.values());
    } else {
        this._elems.push(elems);
    }
};
Collection.prototype.at = function (pos) {
    let result = this._elems[pos - 1];
    return result ? result : null;
};
Collection.prototype.removeAt = function (pos) {
    let result = this._elems[pos - 1];
    if (result) {
        this._elems.splice(pos - 1, 1);
        return true;
    } else {
        return false;
    }
};
Collection.prototype.count = function () {
    return this._elems.length;
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (elems) {
    let _collection = new Collection();
    elems.forEach((elem) => {
        _collection.append(elem);
    });
    return _collection;
};
