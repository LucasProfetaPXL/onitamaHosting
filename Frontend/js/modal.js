const modalOpenBtns = document.querySelectorAll('.modal_btn');
const loginBackdrop = document.querySelector('#login_backdrop');
const registerBackdrop = document.querySelector('#register_backdrop');
const modalCloseBtns = document.querySelectorAll('.close_button');

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