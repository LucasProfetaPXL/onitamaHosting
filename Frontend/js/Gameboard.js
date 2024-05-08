document.addEventListener('DOMContentLoaded', function() {
    // Get the game board container
    var boardContainer = document.getElementById('game-boardHTML');
    let k = 1
    // Create a 5x5 grid
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            // Create a new cell
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell${k}`
            k++
            // Add the cell to the board
            boardContainer.appendChild(cell);
        }
    }

    boardContainer.addEventListener("click", (e) => {
        console.log(e.target.id)
    })
});


