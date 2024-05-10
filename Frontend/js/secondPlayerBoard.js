const updateScreen = () =>{
    if (localStorage.getItem('gameStarted') === 'true'){
        window.location = '../html/Gameboard.html'
    }
    else{
        console.log("just niks gij")
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'gameStarted') {
        updateScreen();
    }
});
