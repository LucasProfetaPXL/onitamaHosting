document.addEventListener('DOMContentLoaded', function() {
    //var playerColors = JSON.parse(localStorage.getItem('PlayerColors'));
    // Created a local object for testing
    var playerColors = {
        "player1": "red",
        "player2": "blue"
    };

    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            // Create a new cell
            let cell = document.createElement('div');

            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell${k}`;
            cell.setAttribute('square-id', (i*j))

            if (i === 0 || i === 4) {

                let pawn = document.createElement('div');
                pawn.className = 'pawn';

                var playerId = Object.keys(playerColors)[i === 0 ? 0 : 1];
                pawn.style.backgroundColor = playerColors[playerId];

                var pawnImage = document.createElement('img');
                pawnImage.className = 'pawn-image';
                if (j === 2) {
                    pawnImage.src = `../Images/master${playerId}.png`;
                } else {
                    pawnImage.src = `../Images/apprenticePawn${playerId}.png`;
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