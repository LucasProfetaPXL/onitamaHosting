let numberOfPlayers = 2;
let playerMatSize = 5;
let moveCardSet = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("makeTableButton").addEventListener('click', function (event) {
        event.preventDefault();

        fetch('https://localhost:5051/api/Tables', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "numberOfPlayers": numberOfPlayers,
                "playerMatSize": playerMatSize,
                "moveCardSet": moveCardSet
            })
            })
            .then(response => {
                window.alert(response.status)
                if (response.status === 201){
                    window.Location = '../game.html';
                    window.alert("success");
                }
                else {
                    window.alert("error");
                    throw new Error('Error');
                }
            })
            .catch(error => {
                console.error("Fetch error:", error.message);
                //throwCode(error.message)
            });

    })
})