const playersTurn = localStorage.getItem('playersTurn')
// const me =
function WhoAmI(){

}

document.addEventListener("storage", WhosTurn);
document.addEventListener("DOMContentLoaded", WhosTurn)

function WhosTurn(){
    const playerElement = document.getElementById('player')
    const apo = document.getElementById('apo')
    playerElement.innerText = playersTurn;
    playerElement.style.color = playersTurn;
    // playerElement.style.textShadow = playersTurn
    apo.style.color = playersTurn;
    // apo.style.textShadow = playersTurn;

}