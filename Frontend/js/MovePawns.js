const draggables = document.querySelectorAll('.pawn');
const container = document.querySelector('.game-boardHTML');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})
container.addEventListener('dragover', (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable  = document.querySelector('.dragging')
    container.appendChild(draggable)
})

function getDragAfterElement(container, y){
    const draggableElements =  container.querySelectorAll('.pawn:not(.dragging)')

    draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect()
        console.log(box)
    },{offset: Number.POSITIVE_INFINITY} )
}



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