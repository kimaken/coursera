// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    let commands = command.split(' '), contactNames = [];

    switch (commands[0]) {
        case 'ADD':
            let name = commands[1], phones = commands[2].split(',');
            if (phoneBook.hasOwnProperty(name)) {
                Array.prototype.push.apply(phoneBook[name], phones);
            } else {
                phoneBook[name] = phones;
            }
            return true;
        case 'REMOVE_PHONE':
            let phone = commands[1];
            contactNames = Object.keys(phoneBook);
            for (let i = 0; i < contactNames.length; i++) {
                let phones = phoneBook[contactNames[i]];
                if (phones.indexOf(phone) != -1) {
                    phones.splice(phones.indexOf(phone), 1);
                    return true;
                }
            }
            return false;
        case 'SHOW':
            contactNames = Object.keys(phoneBook).sort(); 
            let contacts = [], contact = '';
            for (let i = 0; i < contactNames.length; i++) {
                let phones = phoneBook[contactNames[i]];
                if (phones.length) {
                    contact = contactNames[i] + ': ' + phoneBook[contactNames[i]].join(', ');
                    contacts.push(contact);
                }
            }
            return contacts;
        default:
            break;
    }
};
