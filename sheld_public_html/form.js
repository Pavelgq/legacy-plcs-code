const openFormBtn = document.querySelector('.js-show-form')
const formContainer = document.querySelector('.js-form-container')
const form = formContainer.querySelector('.js-form')
const formSubmit = formContainer.querySelector('.js-form-btn')
const inputTel = document.getElementById('TEL')
const formFields = form.querySelectorAll('input:not(#g-recaptcha-response)')

const phoneMask = '+7 (999) 999-99-99';
const phoneInputMask = new Inputmask(phoneMask);
phoneInputMask.mask(inputTel);

openFormBtn.addEventListener('click', function() {
    formContainer.classList.add('open')
})

formSubmit.addEventListener('click', function(e) {
    const elsWithErrors = form.querySelectorAll('.error');
    elsWithErrors.forEach(el => {
        el.classList.remove('error');
    });

    let valid = true;

    formFields.forEach(function(input) {
        if ((input.required && !input.value.trim().length) || (input.type === 'email' && !inputEmailValidate(input.value)) || (input.type === 'tel' && !inputPhoneValidate(input.value, phoneMask))) {
            valid = false
            input.classList.add('error')
            form.classList.add('error')
        }
    })

    if (!valid) {
        e.preventDefault()
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    console.log('success')

    postData('/action.php', { body: formData }).then(function() {
        formFields.forEach(function(input) {
            input.value = ''
        })
        formContainer.classList.remove('open')
        alert(`Мы приняли ваш запрос и пришлем код активации в течение суток вам на почту. \nЕсли письмо не пришло, проверьте папку "Спам"`)
    });
})

function inputEmailValidate(value) {
    const emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]/i;
    const result = value.match(emailRegex);

    if (result && result[0]) return true;
    return false;
}

function inputPhoneValidate(value, mask, canBeEmpty = false) {
    if (canBeEmpty && value === '') return true;
    return Inputmask.isValid(value, { mask: mask });
}

function postData(url, options) {
    const requestOptions = {
        method: 'POST',
        headers: options.headers,
        body: options.body,
    };
    return fetch(url, requestOptions).then(function(response) {
        // return response.json();
        if (response.ok) {
            return response.json()
        }
    });
}
