document.addEventListener('DOMContentLoaded', function() {
    var playerColors = JSON.parse(localStorage.getItem('PlayerColors')) || {
        "player1": "red",
        "player2": "blue"
    };
    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i
            cell.dataset.col = j
            cell.id = `cell${k}`
            cell.setAttribute('square-id', (i * j));

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

            if (i === 0 || i === 4) {
                let pawn = document.createElement('div')
                pawn.className = 'pawn';
                pawn.setAttribute('draggable', "true");
                var playerId = Object.keys(playerColors)[i === 0 ? 0 : 1]
                pawn.style.backgroundColor = playerColors[playerId];

                var pawnImage = document.createElement('img');
                pawnImage.className = 'pawn-image';
                if (j === 2) {
                    pawnImage.src = `../Images/master${pawn.style.backgroundColor}.png`;
                } else {
                    pawnImage.src = `../Images/apprenticePawn${pawn.style.backgroundColor}.png`;
                }

                pawn.appendChild(pawnImage);
                cell.appendChild(pawn);
            }
            k++;
            boardContainer.appendChild(cell);
        }
    }

    flipBoard(boardContainer, playerColors);
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
