document.addEventListener('DOMContentLoaded', function() {
    // Retrieve player colors object from sessionStorage
    var playerColors = JSON.parse(sessionStorage.getItem('PlayerColors'));


    // Get the game board container
    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1;
    // Create a 5x5 grid
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

                // var playerId = Object.keys(playerColors)[i === 0 ? 0 : 1];
                // pawn.style.backgroundColor = playerColors[playerId];
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
