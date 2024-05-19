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
        const imageArray = ["../Images/spelkaarten/boar.png", "../Images/spelkaarten/cobra.png", "../Images/spelkaarten/crab.png", "../Images/spelkaarten/crane.png", "../Images/spelkaarten/dragon.png", "../Images/spelkaarten/eel.png", "../Images/spelkaarten/elephant.png", "../Images/spelkaarten/frog.png", "../Images/spelkaarten/goose.png", "../Images/spelkaarten/horse.png", "../Images/spelkaarten/mantis.png", "../Images/spelkaarten/monkey.png", "../Images/spelkaarten/ox.png", "../Images/spelkaarten/rabbit.png", "../Images/spelkaarten/rooster.png", "../Images/spelkaarten/tiger.png"];
        if (localStorage.getItem("card1") == null){ //images aanvullen
            var playcards = [];
            for (var i = 1; i <= 5; i++){
                var id = "card" + i;
                var randomIndex = Math.floor(Math.random() * imageArray.length);
                playcards.push(imageArray[randomIndex]);
                while (playcards.includes(imageArray[randomIndex])){
                    randomIndex = Math.floor(Math.random() * imageArray.length);
                }
                playcards.push(imageArray[randomIndex]);
                                                                                                                // document.createElement('img')

                //window.alert(i + id);
                localStorage.setItem(id, imageArray[randomIndex]);
                let card = "card" + i;
                let cardimg = document.createElement('img');
                let path = imageArray[i];
                cardimg.src = path;
                //window.alert(cardimg + path + imageArray[i]);
                document.getElementById(card).appendChild(cardimg);
            }
        }
        else{
            for (var i = 1; i <= 5; i++){
                let card = "card" + i;
                let cardimg = document.createElement('img');
                let path = imageArray[i];
                cardimg.src = path;
                //window.alert(cardimg + " else" + path + imageArray[i]);
                document.getElementById(card).appendChild(cardimg);
            }


        }



        // for (var i = 1; i <= 5; i++){
        //     var id = "card" + i;
        //     window.alert(id);
        //     let place = document.getElementById(id);
        //     place.innerHTML = '';
        //     window.alert("?");
        //     place.insertAdjacentHTML("afterbegin", moveCards[i]);
        // }
        //var players = []
        // data.seatedPlayers.forEach(player => {
        //     if(player.moveCards.length === 2) {
        //         var playerData = {
        //             id: player.id,
        //             moveCards: player.moveCards
        //         }
        //         window.alert(playerData);
        //         players.push(playerData)
        //     }
        // })
        // localStorage.setItem('playerMoveCards', JSON.stringify(players))
    })
}

