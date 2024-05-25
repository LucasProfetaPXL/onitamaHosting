// let selectPawnId;
// let selectedCardName;
//
// // Function to fetch possible moves
// const fetchPossibleMoves = (pawnId, cardName) => {
//     if (!pawnId || !cardName) {
//         console.log("Both pawn and card need to be selected.");
//         return;
//     }
//     const sessionID = sessionStorage.getItem('sessionID')
//     const gameId = localStorage.getItem('tableId');
//     const url = `http://localhost:5051/api/Games/${gameId}/possible-moves/${pawnId}/for-card/${cardName}`;
//
//     // Make the fetch request
//     fetch(url, {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${sessionID}`
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch possible moves.');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Process the response data
//             highlightPossibleMoves(data);
//             console.log("Possible moves fetched successfully.");
//
//             // Reset selected values after API call
//             selectPawnId = null;
//             selectedCardName = null;
//         })
//         .catch(error => {
//             console.error('Error fetching possible moves:', error);
//         });
// };
//
// // Function to handle pawn selection
// const handlePawnSelection = (pawnId) => {
//     selectPawnId = pawnId;
//     console.log("Selected pawn:", selectPawnId);
//     fetchPossibleMoves(selectPawnId, selectedCardName);
// };
//
// // Function to handle card selection
// const handleCardSelection = (cardName) => {
//     selectedCardName = cardName;
//     console.log("Selected card:", selectedCardName);
//     fetchPossibleMoves(selectPawnId, selectedCardName);
// };
//
// // Add event listeners for pawn and card selection
// // Example: Assuming pawn elements have class "pawn" and card elements have class "card"
// const pawns = document.querySelectorAll('.pawn');
// pawns.forEach(pawn => {
//     pawn.addEventListener('click', () => {
//         handlePawnSelection(pawn.id);
//     });
// });
//
// const cards = document.querySelectorAll('.cardholder');
// cards.forEach(card => {
//     card.addEventListener('click', () => {
//         handleCardSelection(card.dataset.cardName);
//     });
// });
