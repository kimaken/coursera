'use strict';

// Код валидации формы
function validateForm(config) {
    let form = document.getElementById(config.formId);
    let inputs = document.querySelectorAll('input');
    inputs = Array.from(inputs);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let results = inputs.map(function(input) {
            return inputCheck(input);
        });

        if (results.includes(false)) {
            form.classList.add(config.formInvalidClass);
            form.classList.remove(config.formValidClass);
        } else {
            form.classList.add(config.formValidClass);
            form.classList.remove(config.formInvalidClass);
        }
    });

    form.addEventListener('blur', function(event) {
        let elem = event.target;
        if (elem.tagName === 'INPUT') {
            inputCheck(elem);
        }
    }, true);

    form.addEventListener('focus', function(event) {
        let elem = event.target;
        if (elem.tagName === 'INPUT') {
            elem.classList.remove(config.inputErrorClass);
        }
    }, true);

    // Выводит проверку полей в отдельную функцию, которую будем вызывать в событиях
    function inputCheck(elem) {
        if(elem.dataset.hasOwnProperty('required') && !elem.value) {
            elem.classList.add(config.inputErrorClass);
            return false;
        } 
        else if (elem.dataset.hasOwnProperty('validator')) {
            let reg, min, max, pattern;
            switch(elem.dataset.validator) {
                case 'letters':
                    reg = /^[a-zа-яё]+$/i;
                    if (!elem.value.length || reg.test(elem.value)) {
                        // good
                    } else {
                        elem.classList.add(config.inputErrorClass);
                        return false;
                    }
                    break;
                case 'number':
                    reg = /^-?[0-9]+$/;
                    if (!elem.value.length || reg.test(elem.value)) {
                        // good
                        // Дополнительно проверяем, входит ли введеное число в заданный диапазон
                        if (elem.dataset.validatorMin || elem.dataset.validatorMax) {
                            min = elem.dataset.validatorMin ? elem.dataset.validatorMin : null;
                            max = elem.dataset.validatorMax ? elem.dataset.validatorMax : null;
                            if (+elem.value < +min || +elem.value > +max) {
                                elem.classList.add(config.inputErrorClass);
                                return false;
                            }
                            // good
                        }
                    } else {
                        elem.classList.add(config.inputErrorClass);
                        return false;
                    }
                    break;
                case 'regexp':
                    pattern = new RegExp(elem.dataset.validatorPattern);
                    if (!elem.value.length || pattern.test(elem.value)) {
                        // good
                    } else {
                        elem.classList.add(config.inputErrorClass);
                        return false;
                    }
                    break;
            }
            return true;
        }
    }
}