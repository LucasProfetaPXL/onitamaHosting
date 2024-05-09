document.getElementById('startGameButton').addEventListener('click', function (event){
    event.preventDefault()
    const tabled = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');
    fetch(`https://localhost:5051/api/Tables/${tabled}/start-game`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (response.status === 200){
                console.log("You just started the game succesfully")
                window.location = '../html/Gameboard.html'
                GetPlayerColor(response);
            }
            if (response.status === 500){
                console.log(response)
                console.log(response.json())

            }
            else{
                response.json().then(error =>{
                    console.log(error.message)
                })
                console.log("There went something wrong")
                console.log(response.message)
            }
        })
})

function GetPlayerColor(response){
    var color = {};

    for (var i = 0; i < response.seatedPlayers.length; i++) {
        var playerId = response.seatedPlayers[i].id;
        color[playerId] = response.seatedPlayers[i].color;
    }
    sessionStorage.setItem('PlayerColors', JSON.stringify(color));
}


