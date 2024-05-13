document.addEventListener('DOMContentLoaded', function (){
    const tabled = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');
    //const sessionID = sessionStorage.getItem('sessionID');
    fetch(`https://localhost:5051/api/Games/${tabled}`,{
        method : 'GET',
        mode : 'cors',
        headers: {
            // 'Accept': 'text/plain',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }

    })
        .then(response =>{
            if (response.status === 200){
                console.log("request werkte");
                GetMoveCards(response);
            }
            if (response.status === 500){
                console.log(response);
                console.log(response.json());
            }
            else{
                response.json().then(error =>{
                    console.log(error.message);
                })
                console.log("There went something wrong");
                console.log(response.message);
            }
        })
})
function GetMoveCards(response){
    response.json().then(data => {
        var players = []
        data.seatedPlayers.forEach(player => {
            if(player.moveCards.length === 2) {
                var playerData = {
                    id: player.id,
                    moveCards: player.moveCards
                }
                players.push(playerData)
            }
        })
        localStorage.setItem('playerMoveCards', JSON.stringify(players))
    })
}

