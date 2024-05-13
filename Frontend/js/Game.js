document.getElementById('startGameButton').addEventListener('click', function (event){
    event.preventDefault();
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
                setTimeout(() =>{
                    window.location = '../html/Gameboard.html';
                }, 10000) //this is to look if everything returned in the console because if I don't do this the
                                    //logs are gone because it went to another page

                localStorage.setItem('gameStarted', "true");
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
    response.json().then(data => {
        var color = {};
        for (var i = 0; i < data.seatedPlayers.length; i++) {
            var playerId = data.seatedPlayers[i].id;
            color[playerId] = data.seatedPlayers[i].color;
        }
        localStorage.setItem('PlayerColors', JSON.stringify(color));
    });
}


window.addEventListener('storage', function(event) {
    if (localStorage.getItem('gameStarted') === 'true' && localStorage.getItem('hasSeats') === 'false')
    {
        window.location = '../html/Gameboard.html';
    }
});