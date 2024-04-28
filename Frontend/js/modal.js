const modalOpenBtns = document.querySelectorAll('.modal_btn');
const loginBackdrop = document.querySelector('#login_backdrop');
const registerBackdrop = document.querySelector('#register_backdrop');
const modalCloseBtns = document.querySelectorAll('.close_button');
const loginBtnToRegister = document.querySelector('.register_button_login');
const registerBtnToLogin = document.querySelector('.login_button_register');

modalOpenBtns.forEach(button => {
    button.addEventListener('click', function(e) {
        const clickedButton = e.target;
        const buttonText = clickedButton.textContent;
        console.log('Clicked button text:', buttonText);        
        if (buttonText === 'Register'){
            registerBackdrop.classList.add('modal_open');
        }
        else{
            loginBackdrop.classList.add('modal_open');
        }
    });
});

modalCloseBtns.forEach(button => {
    button.addEventListener('click', function(e) {
        const clickedButton = e.target;
        if (clickedButton.id === 'login_close'){
            loginBackdrop.classList.remove('modal_open');
        }
        else{
            registerBackdrop.classList.remove('modal_open');
        }
    });
});

loginBtnToRegister.addEventListener('click', function() {
    loginBackdrop.classList.remove('modal_open');
    registerBackdrop.classList.add('modal_open');
});

registerBtnToLogin.addEventListener('click', function() {
    registerBackdrop.classList.remove('modal_open');
    loginBackdrop.classList.add('modal_open');
});
