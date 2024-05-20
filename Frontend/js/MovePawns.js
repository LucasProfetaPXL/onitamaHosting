document.addEventListener('DOMContentLoaded', function() {
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
        e.preventDefault();
    })

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        const cell = e.target.closest('.cell');

        if (draggable && cell && !cell.querySelector('.pawn')) {
            cell.appendChild(draggable);
        }
    })
})



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