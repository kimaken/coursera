/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    let operationsSum = operations.length;

    if (!operationsSum) {
        callback(null, []);
    }
    // Счетчик выполненных операций
    let counter = 0;
    // Массив полученных данных из операций
    let data = [];
    // Используем функцию-обертку для замыкания, в котором будет хранится номер операции
    function nextWrapper(i) {
        let index = i;

        return function next(err, result) {
            if(err) {
                callback(err);
                return;
            }
            
            counter++;
            data[index] = result;
            // Если количество выполненных операция совпадает с их общим количеством, вызываем callback
            if (counter === operationsSum) {
                callback(null, data);
            }
        }
    }
    
    operations.forEach((operation, i) => {
        operation(nextWrapper(i));
    });
};