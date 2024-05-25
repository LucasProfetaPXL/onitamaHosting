document.addEventListener('DOMContentLoaded', function() {
    const tabled = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');

    fetch(`https://localhost:5051/api/Games/${tabled}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            // 'Accept': 'text/plain',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response => {
            if (response.status === 200) {
                console.log("request werkte");
                response.json().then(data => {
                    GetMoveCards(data);
                    CreateTableAndPawns(data);
                    console.log(data)
                })
            } else if (response.status === 500) { //eerst stond er alleen maar een if maar het ding is
                //omdat er een if stond en zag dat die status 200 gaf
                //ging die die else uitvoeren omdat ja slechte fout afhandeling
                //doordat die bijde if's gaat kijken en de tweede ging zoizo fout zijn
                console.log(response);
                console.log(response.json());
            } else {
                response.json().then(error => {
                    console.log(error.message);
                })
                console.log("There went something wrong");
                console.log(response.message);
                console.log(response.json());
            }
        })
})

function flipBoard(boardContainer, playerColors) {
    var rows = Array.from(boardContainer.children);
    rows.reverse();
    var currentSessionId = sessionStorage.getItem('sessionID');

    for (var playerId in playerColors) {
        if (playerId === currentSessionId) {
            var currentPlayerColor = playerColors[playerId];

            if (currentPlayerColor === "red") {
                rows.forEach(row => boardContainer.appendChild(row))
            }
            break;
        }
    }
}

function GetMoveCards(data) {
    const imageArray = ["../Images/spelkaarten/boar.png", "../Images/spelkaarten/cobra.png", "../Images/spelkaarten/crab.png", "../Images/spelkaarten/crane.png", "../Images/spelkaarten/dragon.png", "../Images/spelkaarten/eel.png", "../Images/spelkaarten/elephant.png", "../Images/spelkaarten/frog.png", "../Images/spelkaarten/goose.png", "../Images/spelkaarten/horse.png", "../Images/spelkaarten/mantis.png", "../Images/spelkaarten/monkey.png", "../Images/spelkaarten/ox.png", "../Images/spelkaarten/rabbit.png", "../Images/spelkaarten/rooster.png", "../Images/spelkaarten/tiger.png"];
    var playcards = [];
    let firstCardOfFirstPlayer = document.querySelector("#card1");
    let secondCardOfFirstPlayer = document.querySelector("#card2");
    let extraCard = document.querySelector("#card5");
    let firstCardOfSecondPlayer = document.querySelector("#card3");
    let secondCardOfSecondPlayer = document.querySelector("#card4");

    firstCardOfSecondPlayer.dataset.cardName = data.players[0].moveCards[0].name;
    secondCardOfSecondPlayer.dataset.cardName = data.players[0].moveCards[1].name;
    firstCardOfFirstPlayer.dataset.cardName = data.players[1].moveCards[0].name;
    secondCardOfFirstPlayer.dataset.cardName = data.players[1].moveCards[1].name;
    extraCard.dataset.cardName = data.extraMoveCard.name;
    if (localStorage.getItem("card1") == null) { //images aanvullen
        for (var i = 1; i <= 5; i++) {
            var id = "card" + i;
            var randomIndex = Math.floor(Math.random() * imageArray.length);
            playcards.push(imageArray[randomIndex]);
            while (playcards.includes(imageArray[randomIndex])) {
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
    } else {
        for (var i = 1; i <= 5; i++) {
            let card = "card" + i;
            let cardimg = document.createElement('img');
            let path = imageArray[i];
            cardimg.src = path;
            //window.alert(cardimg + " else" + path + imageArray[i]);
            document.getElementById(card).appendChild(cardimg);
        }


    }
}

function CreateTableAndPawns(data){
    //window.alert(data);
    var playerColors = JSON.parse(localStorage.getItem('PlayerColors'));
    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;

    var rows = 5;
    var cols = 5;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = rows - 1 - i; // Починаємо відлік з нижнього лівого кута
            cell.dataset.col = j;
            cell.id = `cell${(rows - 1 - i) * cols + (j + 1)}`;
            // cell.setAttribute('square-id', (i * j));

            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
            })

            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggable = document.querySelector('.dragging');
                if (draggable && !cell.querySelector('.pawn')) {
                    cell.appendChild(draggable);
                }
            })

            if (rows - 1 - i === 0 || rows - 1 - i === 4) {
                let pawn = document.createElement('div')
                pawn.className = 'pawn';
                pawn.setAttribute('draggable', "true");
                var playerId = Object.keys(playerColors)[rows - 1 - i === 0 ? 0 : 1]
                pawn.style.backgroundColor = playerColors[playerId];

                for (const player of data.players) {
                    if (player.id === playerId) {
                        for (const pawnIndex of player.school.allPawns) {
                            if (pawnIndex.position.row === rows - 1 - i && pawnIndex.position.column === j) {
                                pawn.id = pawnIndex.id;
                            }
                        }
                    }
                }

                var pawnImage = document.createElement('img');
                pawnImage.className = 'pawn-image';
                if (j === 2) {
                    pawnImage.src = `../Images/master${pawn.style.backgroundColor}.png`;
                } else {
                    pawnImage.src = `../Images/apprenticePawn${pawn.style.backgroundColor}.png`;
                }
                pawnImage.style.height = "100%";
                pawn.appendChild(pawnImage);
                cell.appendChild(pawn);
            }
            k++;
            boardContainer.appendChild(cell);
        }
    }

    flipBoard(boardContainer, playerColors);

    const cellArray = [];
    for (let i = 0; i < document.getElementById('game-boardHTML').children.length; i++){
        cellArray.push(document.getElementById('game-boardHTML').children[i].outerHTML);
    }
    localStorage.setItem('gameboard', JSON.stringify(cellArray));
    //window.alert(cellArray);
}




/*document.addEventListener('DOMContentLoaded', function() {
    // Retrieve player colors object from sessionStorage
    var playerColors = JSON.parse(localStorage.getItem('PlayerColors'));

    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            // Create a new cell
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell${k}`;

            if (i === 0 || i === 4) {

                var pawn = document.createElement('div');
                pawn.className = 'pawn';

                var playerId = Object.keys(playerColors)[i === 0 ? 0 : 1];
                pawn.style.backgroundColor = playerColors[playerId];

                var pawnImage = document.createElement('img');
                pawnImage.className = 'pawn-image';
                if (j === 2) {
                    pawnImage.src = `master${playerId}.png`;
                } else {
                    pawnImage.src = `apprenticePawn${playerId}.png`;
                }

                // Add the image to the pawn
                pawn.appendChild(pawnImage);

                // Add the pawn to the cell
                cell.appendChild(pawn);
            }
            k++;

            boardContainer.appendChild(cell);
        }
    }

    boardContainer.addEventListener("click", (e) => {
        console.log(e.target.id);
    });
});


function flipBoard(boardContainer) {
    var rows = Array.from(boardContainer.children);
    rows.reverse();
    rows.forEach(row => boardContainer.appendChild(row));
}
*/
 /*

Here we only need to put the second players id in it or yeah your id and then it looks which one you are and gives you the right board in front of you
But I don't know where arthur put this.
if (!) {
    flipBoard(boardContainer);
}

boardContainer.addEventListener("click", (e) => {
    console.log(e.target.id);
});


/*
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve player colors object from sessionStorage
    var playerColors = JSON.parse(localStorage.getItem('PlayerColors'));

    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            // Create a new cell
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell${k}`
            if (i === 0 || i === 4) {
                // Create a pawn element
                var pawn = document.createElement('div');
                pawn.className = 'pawn';

                var playerId = Object.keys(playerColors)[i === 0 ? 0 : 1];
                pawn.style.backgroundColor = playerColors[playerId];

                cell.appendChild(pawn);
            }
            k++

            boardContainer.appendChild(cell);
        }
    }

    boardContainer.addEventListener("click", (e) => {
        console.log(e.target.id)
    })
});

 */


// const tableId = localStorage.getItem('tableId');
// const sessionID = sessionStorage.getItem('sessionID');
// // Define the request body
// const requestBody = {
//     numberOfPlayers: 2,
//     playerMatSize: 5,
//     moveCardSet: 0
// };
// fetch(`https://localhost:5051/api/Games/${tableId}`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionID}`
//     },
//     body: JSON.stringify(requestBody)
// })
//     .then(response => response.json())
//     .then(data => {
//         // Handle the response
//         console.log('Response:', data);
//
//         // Accessing moveCards from the response
//         if (data.seatedPlayers && data.seatedPlayers.length > 0) {
//             const moveCards = data.seatedPlayers[0].moveCards;
//
//             for (var i = 0; i < moveCards.length; i++){
//                 var id = "card" + i;
//                 window.alert(id);
//                 let place = document.getElementById(id);
//                 place.innerHTML = '';
//                 place.insertAdjacentHTML("afterbegin", moveCards[i]);
//             }
//             // Use the moveCards
//             moveCards.forEach(card => {
//                 console.log('Move Card Name:', card.name);
//                 console.log('Move Card Grid:', card.grid);
//                 console.log('Move Card Stamp Color:', card.stampColor);
//             });
//         } else {
//             console.log('No seated players found in the response.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });



// var clickedCard;
//
// clickedcards = document.querySelectorAll('.cardholder');
// clickedcards.forEach(element => {
//     element.addEventListener('click', (event) => {
//         event.preventDefault();
//         clickedCard = event.target.parentElement.id;
//         console.log(`Clicked element ID: ${clickedCard}`);
//         window.alert(clickedCard);
//     });
// });
//
// const clickedPawns = document.querySelectorAll('.game-boardHTML');
// clickedPawns.forEach(element => {
//     //document.getElementsByClassName('pawn');
//     element.addEventListener('click', (event) => {
//         event.preventDefault();
//
//         window.alert(event.target.parentElement.id); //returns id from pawn (else game-boardHTML)
//
//     });
// });




