const allCells =  document.querySelectorAll("#game-boardHTML .cell");
allCells.forEach(cell =>{
    cell.addEventListener('dragstart', dragStart);
    cell.addEventListener('dragsOver', dragOver);
    cell.addEventListener('drop', dragDrop);
})
let startPositionId;
let draggedElement;
function dragStart(e){
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()

    e.target.parentNode.append(draggedElement)
    e.target.append(draggedElement)
}