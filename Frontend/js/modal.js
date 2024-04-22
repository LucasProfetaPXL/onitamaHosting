const loginOpenBtn = document.getElementById('login_modal_btn');
const loginModal = document.getElementById('modal_login');
const loginCloseBtn = document.getElementById('login_close_button');

const OpenModal = () => {
    console.log("here")
    loginModal.classList.add('modal_open');
}

const CloseModal = () => {
    loginModal.classList.remove('modal_open');
}

loginOpenBtn.addEventListener('click', OpenModal);
loginCloseBtn.addEventListener('click', CloseModal);