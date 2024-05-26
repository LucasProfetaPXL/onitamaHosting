const playersTurn = localStorage.getItem('playersTurn')
// const me =

//dit was om te laten zien we ge waart dat ge niet confused ging worden wie een zet moest zetten
function WhoAmI(){

}

document.addEventListener("storage", WhosTurn);
document.addEventListener("DOMContentLoaded", WhosTurn)

function WhosTurn(){
    const playerElement = document.getElementById('player');
    const apo = document.getElementById('apo');
    const playerColors = JSON.parse(localStorage.getItem('PlayerColors'));
    const playersTurn = localStorage.getItem('playersTurn');
    const playerColor = playerColors[playersTurn];
    playerElement.innerText = playerColor;
    playerElement.style.color = playerColor;
    apo.style.color = playerColor;
}
window.onload = function() {
    if(!sessionStorage.getItem("reload")) {
        sessionStorage.setItem("reload", "true");
        setTimeout(function(){
            location.reload();
        }, 2);
    } else {
        sessionStorage.removeItem("reload");
    }
}



