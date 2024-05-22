document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:5051';
    let selectedPawnId = null;
    let selectedCardName = null;
    let moves = [];

    const fetchGameState = () => {
        const gameId = localStorage.getItem('tableId');
        const sessionID = localStorage.getItem('sessionID');
        fetch(`${API_URL}/api/Games/${gameId}`, {
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
                return response.json();
            })
            .then(data => {
                moves = data.moves;
                updateBoard();
            })
            .catch(error => console.error('Fetch error:', error));
    };

    const fetchPossibleMoves = (pawnId, cardName) => {
        const gameId = localStorage.getItem('tableId');
        const url = `${API_URL}/api/Games/${gameId}/possible-moves/${pawnId}/for-card/${cardName}`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message) });
                }
                return response.json();
            })
            .then(data => {
                highlightPossibleMoves(data);
            })
            .catch(error => console.error('Error fetching possible moves:', error));
    };

    const highlightPossibleMoves = (possibleMoves) => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('highlight');
        });
        possibleMoves.forEach(move => {
            const cell = document.getElementById(`cell${move.cellId}`);
            if (cell) {
                cell.classList.add('highlight');
            }
        });
    };

    const updateBoard = () => {
        document.querySelectorAll('.pawn').forEach(pawn => {
            pawn.remove();
        });
        moves.forEach(move => {
            const draggable = document.createElement('div');
            draggable.classList.add('pawn');
            draggable.id = move.pawnId;
            draggable.style.backgroundColor = move.color;
            draggable.setAttribute('draggable', 'true');

            const targetCell = document.getElementById(`cell${move.cellId}`);
            if (draggable && targetCell) {
                targetCell.appendChild(draggable);
            }
        });
        addDraggableEventListeners();
    };

    const addDraggableEventListeners = () => {
        const draggables = document.querySelectorAll('.pawn');
        draggables.forEach(draggable => {
            draggable.addEventListener('click', () => {
                selectedPawnId = draggable.id;
                if (selectedCardName) {
                    fetchPossibleMoves(selectedPawnId, selectedCardName);
                }
            });

            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', (e) => {
                draggable.classList.remove('dragging');
                const cell = document.elementFromPoint(e.clientX, e.clientY).closest('.cell');
                if (cell && !cell.querySelector('.pawn')) {
                    cell.appendChild(draggable);

                    const move = {
                        pawnId: draggable.id,
                        moveCardName: selectedCardName,
                        to: {
                            row: parseInt(cell.dataset.row),
                            column: parseInt(cell.dataset.col)
                        },
                        cellId: cell.id
                    };

                    const gameId = localStorage.getItem('tableId');
                    fetch(`${API_URL}/api/Games/${gameId}/move-pawn`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(move)
                    }).then(() => {
                        fetchGameState();
                    }).catch(error => console.error('Error making move:', error));
                }
            });
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



// document.addEventListener('DOMContentLoaded', function() {
//     const API_URL = 'http://localhost:5051';
//     let selectedPawnId = null;
//     let selectedCardName = null;
//     let moves = [];
//
//
//     const fetchGameState = () => {
//         const gameId = localStorage.getItem('tableId');
//         const sessionID = localStorage.getItem('sessionID')
//         fetch(`${API_URL}/api/Games/${gameId}`, {
//             method: 'GET',
//             mode: 'cors',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${sessionID}`
//             }
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     console.error('Error:', response.status);
//                     throw new Error('Failed to fetch game data');
//
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 moves = data.moves;
//                 updateBoard();
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 console.log( error.json());
//             })
//     }
//
//     const fetchPossibleMoves = (pawnId, cardName) => {
//         const gameId = localStorage.getItem('tableId');
//         const url = `${API_URL}/api/Games/${gameId}/possible-moves/${pawnId}/for-card/${cardName}`;
//
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 highlightPossibleMoves(data);
//             })
//             .catch(error => console.error('Error fetching possible moves:', error));
//     }
//
//     const highlightPossibleMoves = (possibleMoves) => {
//         document.querySelectorAll('.cell').forEach(cell => {
//             cell.classList.remove('highlight');
//         })
//         possibleMoves.forEach(move => {
//             const cell = document.getElementById(`cell${move.cellId}`);
//             if (cell) {
//                 cell.classList.add('highlight');
//             }
//         })
//     }
//
//     const updateBoard = () => {
//         moves.forEach(move => {
//             const draggable = document.getElementById(move.pawnId);
//             const targetCell = document.getElementById(`cell${move.cellId}`);
//             if (draggable && targetCell) {
//                 targetCell.appendChild(draggable);
//             }
//         })
//     }
//
//     const draggables = document.querySelectorAll('.pawn');
//     draggables.forEach(draggable => {
//         draggable.addEventListener('click', () => {
//             selectedPawnId = draggable.id;
//             if (selectedCardName) {
//                 fetchPossibleMoves(selectedPawnId, selectedCardName);
//             }
//         })
//
//         draggable.addEventListener('dragstart', () => {
//             draggable.classList.add('dragging');
//         })
//
//         draggable.addEventListener('dragend', (e) => {
//             draggable.classList.remove('dragging');
//             const cell = document.elementFromPoint(e.clientX, e.clientY).closest('.cell');
//             if (cell && !cell.querySelector('.pawn')) {
//                 cell.appendChild(draggable);
//
//                 const move = {
//                     pawnId: draggable.id,
//                     moveCardName: selectedCardName,
//                     to: {
//                         row: parseInt(cell.dataset.row),
//                         column: parseInt(cell.dataset.col)
//                     },
//                     cellId: cell.id
//                 }
//
//                 const gameId = localStorage.getItem('tableId');
//                 fetch(`${API_URL}/api/Games/${gameId}/move-pawn`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(move)
//                 }).then(() => {
//                     fetchGameState();
//                 }).catch(error => console.error('Error making move:', error));
//             }
//         })
//     })
//
//     const container = document.querySelector('.game-boardHTML');
//     container.addEventListener('dragover', (e) => {
//         e.preventDefault();
//     })
//
//     container.addEventListener('drop', (e) => {
//         e.preventDefault();
//         const draggable = document.querySelector('.dragging');
//         const cell = e.target.closest('.cell');
//
//         if (draggable && cell && !cell.querySelector('.pawn')) {
//             cell.appendChild(draggable);
//         }
//     })
//
//     const cards = document.querySelectorAll('.cardholder');
//     cards.forEach(card => {
//         card.addEventListener('click', () => {
//             selectedCardName = card.dataset.cardName;
//             if (selectedPawnId) {
//                 fetchPossibleMoves(selectedPawnId, selectedCardName);
//             }
//         })
//     })
//
//
//     setInterval(fetchGameState, 2000);
// })



// document.addEventListener('DOMContentLoaded', function() {
//     const draggables = document.querySelectorAll('.pawn');
//     const container = document.querySelector('.game-boardHTML');
//
//     draggables.forEach(draggable => {
//         draggable.addEventListener('dragstart', (e) => {
//             draggable.classList.add('dragging');
//         })
//         draggable.addEventListener('dragend', () => {
//             draggable.classList.remove('dragging');
//         })
//     })
//
//     container.addEventListener('dragover', (e) => {
//         e.preventDefault();
//     })
//
//     container.addEventListener('drop', (e) => {
//         e.preventDefault();
//         const draggable = document.querySelector('.dragging');
//         const cell = e.target.closest('.cell');
//
//         if (draggable && cell && !cell.querySelector('.pawn')) {
//             cell.appendChild(draggable);
//         }
//     })
// })



// const draggables = document.querySelectorAll('.pawn');
// const container = document.querySelector('.game-boardHTML');
//
// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', (e) => {
//         draggable.classList.add('dragging')
//     })
//     draggable.addEventListener('dragend', () => {
//         draggable.classList.remove('dragging')
//     })
// })
//
// container.addEventListener('dragover', (e) => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(container, e.clientY)
//     const draggable = document.querySelector('.dragging')
//
//     if (draggable && afterElement) {
//         console.log(afterElement)
//         if (afterElement.nextSibling !== draggable) {
//             container.insertBefore(draggable, afterElement.nextSibling)
//         }
//     }
// })
//
// function getDragAfterElement(container, y) {
//     const draggableElements = container.querySelectorAll('.pawn:not(.dragging)');
//
//     // Test to see if there is a draggable element
//     if (draggableElements.length === 0) {
//         return null;
//     }
//
//     return [...draggableElements].reduce((closest, child) => {
//         const box = child.getBoundingClientRect()
//         const offset = y - box.top - box.height / 2;
//         console.log(offset);
//         if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: child }
//         } else {
//             return closest;
//         }
//     }, { offset: Number.NEGATIVE_INFINITY }).element
// }





// const allCells =  document.querySelectorAll("#game-board .cell");
// allCells.forEach(cell =>{
//     cell.addEventListener('dragstart', dragStart);
//     cell.addEventListener('dragover', dragOver);
//     cell.addEventListener('drop', dragDrop);
// })
// let startPositionId;
// let draggedElement;
// function dragStart(e){
//     startPositionId = e.target.parentNode.getAttribute('square-id')
//     draggedElement = e.target;
// }
//
// function dragOver(e){
//     e.preventDefault();
// }
//
// function dragDrop(e){
//     e.stopPropagation()
//
//     const targetCell = e.target;
//
//     // Check if the target cell has a child (pawn)
//     if (!targetCell.firstElementChild) {
//         targetCell.appendChild(draggedElement);
//     }
//
//     e.target.parentNode.append(draggedElement)
//     e.target.appendChild(draggedElement)
// }