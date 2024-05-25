let selectPawnId;
let selectCardName;
const fetchPossibleMoves = (pawnId, cardName) => {
    if (!pawnId || !cardName) {
        console.log("Both pawn and card need to be selected.");
        return;
    }
    const sessionID = sessionStorage.getItem('sessionID')
    const gameId = localStorage.getItem('tableId');
    const url = `http://localhost:5051/api/Games/${gameId}/possible-moves/${pawnId}/for-card/${cardName}`;
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch possible moves.');
            }
            return response.json();
        })
        .then(data => {
            // Process the response data
            highlightPossibleMoves(data);
            console.log("Possible moves fetched successfully.");

            // Reset selected values after API call
            selectPawnId = null;
            selectCardName = null;
        })
        .catch(error => {
            console.error('Error fetching possible moves:', error);
        })
}
const handlePawnSelection = (pawnId) => {
    selectPawnId = pawnId;
    console.log("Selected pawn:", selectPawnId);
    fetchPossibleMoves(selectPawnId, selectCardName);
}
const handleCardSelection = (cardName) => {
    selectCardName = cardName;
    console.log("Selected card:", selectCardName);
    fetchPossibleMoves(selectPawnId, selectCardName);
}
const pawns = document.querySelectorAll('.pawn');
pawns.forEach(pawn => {
    pawn.addEventListener('click', () => {
        handlePawnSelection(pawn.id);
    })
})

const cards = document.querySelectorAll('.cardholder');
cards.forEach(card => {
    card.addEventListener('click', () => {
        handleCardSelection(card.dataset.cardName);
    })
})
