document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const form = document.querySelectorAll('form');

    const regName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
    // const regPhone = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
    const regEmail = /^([a-z0-9-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let isValidateName = false;
    let isValidatePhone = false;
    let isValidateEmail = false;
    let isValidate = false;

    let phoneInputs = document.querySelectorAll('input[name="phone"]');

    let getInputNumbersValues = (input) => {
        return input.value.replace(/\D/g, "");
    }
    

    let onPhoneInput = (e) => {
        let input = e.target,
            inputNumbersValue = getInputNumbersValues(input),
            formattedInputValue = '',
            selectionStart = input.selectionStart;
        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        // Маска номеров
        if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1)  {
            // russian form number
            if (inputNumbersValue[0] == '9') {inputNumbersValue = '7' + inputNumbersValue};
            let firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7';
            formattedInputValue = firstSymbols + ' ';
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' +inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' +inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' +inputNumbersValue.substring(9, 11);
            }
            

        } else {
            // not russian numbers
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);

        }
        input.value = formattedInputValue;
        if (input.value.length < 17) {
            input.previousElementSibling.textContent = 'Введите корректный номер телефона!';
            isValidatePhone = false;
                
        } else {
            input.previousElementSibling.textContent = '';
            isValidatePhone = true;
                
        };
        
    }

    // Удаление первой цифры
    let onPhoneKeyDown = (e) => {
        let input = e.target;


        if (e.keyCode == 8 && getInputNumbersValues(input).length == 1) {
            input.value = '';
        }
    }

    // Ограничение копирования
    let onPhonePaste = (e) => {
        let pasted = e.clipboardData || window.clipboardData,
            input = e.target,
            inputNumbersValue = getInputNumbersValues(input);
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    }

    phoneInputs.forEach((phoneInp) => {
        phoneInp.addEventListener('input', onPhoneInput);
        phoneInp.addEventListener('keydown', onPhoneKeyDown);
        phoneInp.addEventListener('paste', onPhonePaste);

    })
    
    


    const validateElem = (elem) => {

        if (elem.name == 'name') {
            if (!regName.test(elem.value) && elem.value !== '') {
                elem.previousElementSibling.textContent = 'Введите кореектное имя пользователя!';
                isValidateName = false;
                
            } 
            else {
                elem.previousElementSibling.textContent = '';
                isValidateName = true;
                
            }};
        if (elem.name == 'email') {
            if (!regEmail.test(elem.value) && elem.value !== '') {
                elem.previousElementSibling.textContent = 'Введите кореектный email!';
                isValidateEmail = false;
                
            } 
            else {
                elem.previousElementSibling.textContent = '';
                isValidateEmail = true;
                
            };
        };
    };


    


    form.forEach((formItem) => {


        for (let element of formItem) {
            if (element.tagName !== 'BUTTON') {
                element.addEventListener('blur', () => [
                    validateElem(element)
                ]);
            };
        };

        formItem.addEventListener('submit', async function formSend(e) {
            e.preventDefault();
            
            for (let element of formItem) {
                if (element.tagName !== 'BUTTON') {
                    if (element.value == "") {
                        element.previousElementSibling.textContent = 'Данное поле не заполнено!'
                        isValidate = false;
                            

                    } else {
                        element.previousElementSibling.textContent = ''
                        isValidate = true;
                            

                    }
                }
            };
            let formData = new FormData(formItem);

            if (isValidate && isValidateName && isValidateEmail && isValidatePhone) {
                let response = await fetch('../mailer/mailer/smart.php', {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {

                    const overlay = document.querySelector('.overlay');
                    const modalWindowConsultation = document.querySelector('#consultation');
                    const modalWindowOrder = document.querySelector('#order');
                    const modalWindowThanks = document.querySelector('#thanks');
                    modalWindowConsultation.classList.remove('visible')
                    modalWindowConsultation.classList.add('hidden')
                    modalWindowOrder.classList.remove('visible')
                    modalWindowOrder.classList.add('hidden')
                    overlay.classList.add('visible')
                    modalWindowThanks.classList.add('visible')

                    formItem.reset();
                } else {
                    alert('Error')
                }
            }
        } );
    })
});

