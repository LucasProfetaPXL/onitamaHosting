const leaveFetch = (e) => {
    const tableid = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');

    if (e.id !== 'leaveInModal') {
        localStorage.setItem('hasSeats', 'true');
    }

    fetch(` https://localhost:5051/api/Tables/${tableid}/leave`,{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Accept': '*/*',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (!response.ok){
                throw new Error("error")
            }
            if (response.status === 200){
                // var element = document.getElementById('tableAvailability');
                console.log("You just left succesfully")
                // document.getElementById("tableAvailability").hidden;
                 //window.alert("h");
                window.location = '../html/lobby.html';
            }
        })
        .catch((error) => {
            console.log(error);
        })
}
const leaveBtns = document.querySelectorAll('.leaveButton');
const modalWait = document.querySelector('#wait_backdrop')

leaveBtns.forEach((button) => {
    button.addEventListener('click', leaveFetch)
    modalWait.classList.remove('modal_close');
})




//document.getElementById('leaveTable').addEventListener('click', leaveFetch);

// window.addEventListener('DOMContentLoaded', function(event) {
//
//     if (localStorage.getItem('gameStarted') === true) {
//         window.alert("hee");
//
//         document.getElementById('leaveTable').addEventListener('click', leaveFetch);
//
//     }
// });

// window.addEventListener('load', updateWaitModal);

// if (window.location.href === 'Gameboard.html'){
if (window.location.pathname.endsWith('/Gameboard.html')){
    document.getElementById('leaveTable').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('leaveTable').addEventListener('click', leaveFetch);
    })
}

// if (window.location.href.includes('Gameboard.html')) {
//     document.getElementById('leaveTable').addEventListener('click', function(event) {
//         event.preventDefault();
//         window.alert("hee");
//         document.getElementById('leaveTable').addEventListener('click', leaveFetch);
//     });
// }

