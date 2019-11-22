/**
 * @param {Array} arr - массив с массивами
 * @returns {Array} массив с пересекающимися аргументами
 */
function filterByDublicates(arrays) {
    if (!arrays.length) return [];
	let results = arrays[0].slice();
	for (let i = 1; i < arrays.length; i++) {
        results = results.filter(function (elem, index) {
            return arrays[i].indexOf(elem) != -1;
        });
    }
    return results;
}

/**
 * @returns {Array} массив без дубликатов
 */
Array.prototype.rmRepeats = function() {
    return this.slice().sort().filter(function(elem, i, arr) {
        if (!arr[i + 1]) return true;
        return elem !== arr[i+1];
    })
}

/**
 * @param {Array} arr
 * @returns {Array} массив с новыми объектами
 */
function copyArrayWithObjects(arr) {
	let newArr = arr.map(function(elem) {
  	let keys = Object.keys(elem);
    let newObj = {};
    for (let i = 0; i < keys.length; i++) {
    	newObj[keys[i]] = elem[keys[i]];
    }
    return newObj;
  });
  return newArr;
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    // Делаем копию коллекции
    let copyCollection = copyArrayWithObjects(collection);
    // Проверяем наличие дополнительных аргументов
    if (arguments[1] === undefined) {
        return copyCollection;
    }

    // Получаем все переданные команды
    let commands = [].slice.call(arguments, 1);
    let selectArgs = [], filterArgsObj = {}, filterCommand = '';
    for (let i = 0, diffFilterAgr = false; i < commands.length; i++) {
        let command = commands[i][0]; // [->'select', ['arg1', 'arg2', 'argN']] или [->'filter', 'fieldName', ['arg1', 'arg2', 'argN']]
        let commandArgs = []; 
        switch (command) {
            case 'select': 
                commandArgs = commands[i][1]; // ['select', ->['arg1', 'arg2', 'argN']]
                selectArgs.push(commandArgs);
                break;
            case 'filter':
                if (filterArgsObj[commands[i][1]] === undefined) {
                    filterArgsObj[commands[i][1]] = [];
                    filterArgsObj[commands[i][1]].push(commands[i][2]);
                } else {
                    filterArgsObj[commands[i][1]].push(commands[i][2]);
                }
                break;
        }
    }

    
    
    let filterFields = Object.keys(filterArgsObj);
    if (filterFields.length) {
        filterFields.forEach(function(elem) {
            filterArgsObj[elem] = filterByDublicates(filterArgsObj[elem]).rmRepeats();
        })
        // Удаляем дубликаты из полученных аргументов
        copyCollection = copyCollection.filter(function(elem) {
            for (let i = 0, isCheck = true; i < filterFields.length; i++) {
                isCheck = filterArgsObj[filterFields[i]].indexOf(elem[filterFields[i]]) != -1;
                if (!isCheck) return false;
            }
            return true;
        });
    }

    if (selectArgs.length) {
        selectArgs = filterByDublicates(selectArgs);
        // Удаляем дубликаты из полученных аргументов
        selectArgs = selectArgs.rmRepeats();

        // Удаляем аргументы с названиями не существующих полей
        let existFieldsNames = Object.keys(copyCollection[0]); 
        selectArgs = selectArgs.filter(function(elem) {
            return existFieldsNames.indexOf(elem) != -1;
        });

        copyCollection = copyCollection.map(function(elem) {
            let newObj = {};
            selectArgs.forEach(function(jElem) {
                newObj[jElem] = elem[jElem];
            });
            return newObj;
        });
    }

    return copyCollection;
}

/**
 * @params {String[]}
 */
function select() {
    return ['select', [].slice.call(arguments)];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ['filter', property, values];
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
