const modalWait = document.querySelector('#wait_backdrop');
const updateWaitModal = () => {
    if (localStorage.getItem('hasSeats') === 'false') {
        modalWait.classList.remove('modal_open');
    } else {
        modalWait.classList.add('modal_open');
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'hasSeats') {
        updateWaitModal();
    }
});

window.addEventListener('load', updateWaitModal);