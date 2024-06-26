const playersColor = localStorage.getItem('PlayerColors')
let selectedPawnId;
console.log(playersColor)
document.addEventListener('DOMContentLoaded', function() {
    const sessionID = sessionStorage.getItem('sessionID');
    const gameBoard = document.querySelector("#game-boardHTML");
    //let selectedPawnId;
    gameBoard.addEventListener('dragend', (e) => {
        e.preventDefault();
        // selectedPawnId = e.target.closest('.pawn').id;
        console.log(e.target.closest('.pawn').id)


        //dit is een test
        const draggable = e.target.closest('.pawn'); // Get the dragged pawn element
        const cell = e.target.closest('.cell'); // Get the cell where the pawn is dropped

        //if (draggable && cell && !cell.querySelector('.pawn')) {
            const gameId = localStorage.getItem('tableId');
            fetch(`https://localhost:5051/api/Games/${gameId}/move-pawn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionID}`
                },
                body: JSON.stringify({
                    pawnId: draggable.id,
                    moveCardName: selectedCardName,
                    to: {
                        row: parseInt(cell.dataset.row), // Get row from cell dataset
                        column: parseInt(cell.dataset.col) // Get column from cell dataset
                    }
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to make move');
                    }
                    else{
                        console.log(response.json())
                    }
                    return response.json();
                })
                .then(() => fetchGameState())
                .catch(error => console.error('Error making move:', error));
        //}
        //tot hier is de test



    });
    //let selectedCardName = null;

    let moves = [];
    const fetchGameState = () => {
        const tabled = localStorage.getItem('tableId');
        const sessionID = sessionStorage.getItem('sessionID');

        return fetch(`https://localhost:5051/api/Games/${tabled}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionID}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message) });
                }
                else{
                    return response.json()
                }


            })
            .then(data => {
                console.log(data);
                var stringdata = JSON.stringify(data);
                //window.alert(stringdata.split(",").at(stringdata.split(",").length - 3));
                //playerToPlayIdd = stringdata.split(",").at(stringdata.split(",").length - 3)
                //window.alert(playerToPlayId);
                localStorage.setItem('playersTurn', data.playerToPlayId);
                return data;
            })
            .catch(error => {
                console.error('Error fetching game state:', error);
                throw error
            })

    };

// Example usage
    fetchGameState()
        .then(gameData => {
            updateBoard(gameData);
        })
        .catch(error => console.error('Error fetching game state:', error));

    const fetchPossibleMoves = (pawnId, cardName) => {
        const gameId = localStorage.getItem('tableId');
        const url = `https://localhost:5051/api/Games/${gameId}/possible-moves-of/${pawnId}/for-card/${cardName}`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${sessionID}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    window.alert("highlightPossibleMoves nOT");
                    return response.json().then(err => { throw new Error(err.message) });
                }
                return response.json();
            })
            .then(data => {
                highlightPossibleMoves(data);
                console.log(data)
            })
            .catch(error => console.error('Error fetching possible moves:', error));
    };
    const highlightPossibleMoves = (possibleMoves) => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });
        cells.forEach(cell => {
            possibleMoves.forEach(move => {
                if (parseInt(cell.dataset.row) === move.to.row && parseInt(cell.dataset.col) === move.to.column) {
                    cell.classList.add('highlight');
                }
            });
        });


    };
    const updateBoard = (gameData) => {
        // Clear the existing pawns from the board
        document.querySelectorAll('.pawn').forEach(pawn => {
            //pawn.remove();
        });

        // Get the players and their pawns
        const players = gameData.players;

        players.forEach(player => {
            player.school.allPawns.forEach(pawn => {
                const pawnElement = document.createElement('div');
                pawnElement.classList.add('pawn');
                pawnElement.id = pawn.id;
                pawnElement.style.backgroundColor = player.color;
                pawnElement.setAttribute('draggable', 'true');

                const position = pawn.position;
                const targetCell = document.getElementById(`cell${position.row}-${position.column}`);
                if (targetCell) {
                    targetCell.appendChild(pawnElement);
                }
            });
        });

        // Add event listeners for drag-and-drop functionality
        addDraggableEventListeners();
    };

// Example call with the fetched game data
    fetchGameState()
        .then(gameData => {
            updateBoard(gameData);
        })
        .catch(error => console.error('Error fetching game state:', error));

    const addDraggableEventListeners = () => {
        const draggables = document.querySelectorAll('.pawn');
        // const clickedPawns = document.querySelectorAll('.game-boardHTML');
        // clickedPawns.forEach(element => {
        //     element.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         e.stopPropagation();
        //         if (selectedPawnId !== undefined){
        //             document.getElementById(selectedPawnId).style.border = '';
        //         }
        //         if (e.target.parentElement.id !== "game-boardHTML"){
        //             selectedPawnId = e.target.parentElement.id;
        //             document.getElementById(selectedPawnId).style.border = '5px solid white';
        //             //window.alert(event.target.parentElement.id);
        //         }
        //         if (selectedCardName) {
        //             console.log(selectedPawnId);
        //             fetchPossibleMoves(selectedPawnId, selectedCardName);
        //         }
        //     });
        // });
        const gameBoard = document.querySelector('.game-boardHTML');

        if (!gameBoard.dataset.listenerAdded) {
            gameBoard.addEventListener('click', (e) => {
                e.preventDefault();
                let pawn = e.target;
                while (pawn && !pawn.classList.contains('pawn')) {
                    pawn = pawn.parentElement;
                }
                if (!pawn) {
                    return;
                }
                if (selectedPawnId !== undefined) {
                    const prevSelectedPawn = document.getElementById(selectedPawnId);
                    if (prevSelectedPawn) {
                        prevSelectedPawn.style.border = '';
                    }
                }

                selectedPawnId = pawn.id;
                pawn.style.border = '5px solid white';

                if (selectedCardName) {
                    // console.log(selectedPawnId);
                    fetchPossibleMoves(selectedPawnId, selectedCardName);
                }
            });

            gameBoard.dataset.listenerAdded = "true";
        }
        draggables.forEach(draggable => {
            draggable.addEventListener('click', () => {

            });

            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });
            draggable.addEventListener('dragend', (e) => {
                draggable.classList.remove('dragging');
                const element = document.elementFromPoint(e.clientX, e.clientY);
                if (element) {
                    const cell = element.closest('.cell');
                    if (cell && !cell.querySelector('.pawn')) {
                        cell.appendChild(draggable);

                        // const move = {
                        //     pawnId: draggable.id,
                        //     moveCardName: selectedCardName,
                        //     to: {
                        //         row: parseInt(cell.dataset.row),
                        //         column: parseInt(cell.dataset.col)
                        //     },
                        // };
                        // console.log(move.to.row);
                        // console.log(move.to.column);
                        // console.log(e.target.closest('.pawn').id)
                        const gameId = localStorage.getItem('tableId');
                        fetch(`https://localhost:5051/api/Games/${gameId}/move-pawn`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${sessionID}`
                            },
                            body: JSON.stringify({
                                pawnId: draggable.id,
                                moveCardName: selectedCardName,
                                to: {
                                    row: parseInt(e.target.closest('.pawn').row),
                                    column: parseInt(e.target.closest('.pawn').col)
                                }
                            })
                        }).then((response) => {
                            return response.json();
                        }).then((data) => {
                            console.log(data);
                            fetchGameState();
                        }).catch(error => console.error('Error making move:', error));

                    }
                }
            });

            // draggable.addEventListener('dragend', (e) => {
            //     draggable.classList.remove('dragging');
            //     const cell = document.elementFromPoint(e.clientX, e.clientY).closest('.cell');
            //     if (cell && !cell.querySelector('.pawn')) {
            //         cell.appendChild(draggable);
            //
            //         const move = {
            //             pawnId: draggable.id,
            //             moveCardName: selectedCardName,
            //             to: {
            //                 row: parseInt(cell.dataset.row),
            //                 column: parseInt(cell.dataset.col)
            //             },
            //             //cellId: cell.id
            //         };
            //         console.log(cell.dataset.row);
            //         console.log(cell.dataset.col);
            //
            //         const gameId = localStorage.getItem('tableId');
            //         fetch(`http://localhost:5051/api/Games/${gameId}/move-pawn`, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(move)
            //         }).then(() => {
            //             fetchGameState();
            //         }).catch(error => console.error('Error making move:', error));
            //     }
            // });
        });
    };

    const container = document.querySelector('.game-boardHTML');
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        const cell = e.target.closest('.cell');

        if (draggable && cell && !cell.querySelector('.pawn')) {
            cell.appendChild(draggable);
        }
    });

    const cards = document.querySelectorAll('.cardholder');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            selectedCardName = card.dataset.cardName;
            if (selectedPawnId) {
                fetchPossibleMoves(selectedPawnId, selectedCardName);
            }
        });
    });

    setInterval(fetchGameState, 2000);
});

var clickedCard;
//let selectedPawnId;
let selectedCardName;
clickedcards = document.querySelectorAll('.cardholder');
clickedcards.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        if (clickedCard !== undefined){
            document.getElementById(clickedCard).children[0].style.border = '';
        }
        clickedCard = event.target.parentElement.id;
        document.getElementById(clickedCard).children[0].style.border = '5px solid white';
        selectedCardName = event.target.src;
        selectedCardName = selectedCardName.split("/");
        selectedCardName = selectedCardName[selectedCardName.length - 1].split(".")[0];
        //window.alert(selectedCardName);
        checkIfBothSelected();
    });
});

const clickedPawns = document.querySelectorAll('.game-boardHTML');
clickedPawns.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        if (selectedPawnId !== undefined){
            document.getElementById(selectedPawnId).style.border = '';
        }
        if (event.target.parentElement.id !== "game-boardHTML"){
            selectedPawnId = event.target.parentElement.id;


            document.getElementById(selectedPawnId).style.border = '5px solid white';

            //document.getElementById(selectedPawnId).style.borderColor = 'lightgray black gray';
            // document.getElementById(selectedPawnId).style.backgroundImage = "linear-gradient(bottom, lightgray, black) 1";
            // document.getElementById(selectedPawnId).style.borderWidth = "4px";
            // document.getElementById(selectedPawnId).style.borderStyle = 'solid';
            // document.getElementById(selectedPawnId).style.borderRadius = '50%';
            //document.getElementById(selectedPawnId).style.boxShadow = '0 0 0 2px white';
            // document.getElementById(selectedPawnId).style.position = 'relative';
            // document.getElementById(selectedPawnId).style.paddingTop = '-5px';
            // document.getElementById(selectedPawnId).style.paddingLeft = '-5px';



        }
        checkIfBothSelected();
    });
});

function checkIfBothSelected() {
    if (selectedPawnId !== undefined && clickedCard !== undefined) {
        //window.alert('Both a pawn and a card have been selected.');

        const cellArray = []; // next 5 lines for syncing gameboard -> place in switch player method
        for (let i = 0; i < document.getElementById('game-boardHTML').children.length; i++){
            cellArray.push(document.getElementById('game-boardHTML').children[i].outerHTML);
        }
        localStorage.setItem('gameboard', JSON.stringify(cellArray));
        //
        //
        // const gameId = localStorage.getItem('tableId');
        // const sessionID = sessionStorage.getItem('sessionID');

        // fetch(`http://localhost:5051/api/Games/${gameId}/possible-moves/${sessionID}/for-card/${selectedCardName}`, {
        // fetch(`http://localhost:5051/api/Games/${gameId}/possible-moves/${sessionID}/for-card/MoveCard8`, {
        //     method: 'GET',
        //     //mode: 'cors',
        //     headers: {
        //         'Accept': 'text/plain',
        //         'Authorization': `Bearer ${sessionID}`,
        //         'pawnId': selectedPawnId,
        //         'moveCardName': 'MoveCard8'
        //     }
        // })
        //     .then(response => {
        //         window.alert(response);
        //         if (response.ok){
        //             window.alert("response OK");
        //             showPossibleMoves([]);
        //         }
        //     })
            // .then(data => {
            //     window.alert(data);
            //
            // })
            //.catch(error => console.error(error));
    }
}

function showPossibleMoves(cellid){
    cellid.forEach(function (id) {
        document.getElementById(id).style.border = '3px solid green';
    });
}

// window.addEventListener('storage', (event) => {
//     if (event.key === 'gameboard'){
//         syncGameboard();
//     }
// })
// function syncGameboard(){
//     document.getElementById('game-boardHTML').innerHTML = '';
//     const cellArray = JSON.parse(localStorage.getItem('gameboard'));
//     cellArray.forEach(cellHTML => {
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = cellHTML;
//         document.getElementById('game-boardHTML').appendChild(tempDiv.firstElementChild);
//     });
// }