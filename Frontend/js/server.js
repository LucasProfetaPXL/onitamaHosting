const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5051;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let gameState = {
    moves: []
};

// Endpoint to get the current game state
app.get('/game-state', (req, res) => {
    res.json(gameState);
});

// Endpoint to post a new move
app.post('/move', (req, res) => {
    const move = req.body;
    gameState.moves.push(move);
    res.status(201).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
