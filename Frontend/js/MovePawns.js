const allCells =  document.querySelectorAll("#game-board .cell");
allCells.forEach(cell =>{
    cell.addEventListener('dragstart', dragStart);
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('drop', dragDrop);
})
let startPositionId;
let draggedElement;
function dragStart(e){
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(e){
    e.stopPropagation()

    const targetCell = e.target;

    // Check if the target cell has a child (pawn)
    if (!targetCell.firstElementChild) {
        targetCell.appendChild(draggedElement);
    }

    e.target.parentNode.append(draggedElement)
    e.target.appendChild(draggedElement)
}