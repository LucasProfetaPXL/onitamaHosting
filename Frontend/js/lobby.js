document.addEventListener('DOMContentLoaded', function() {
    // const numberOfPlayers = 2;
    // const playerMatSize = 5;
    // const moveCardSet = 0;
    // const makeTableButton = document.getElementById('makeTableButton');
    // makeTableButton.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const token = localStorage.getItem('sessionID');
    //     fetch('https://localhost:5051/api/Tables', {
    //         method: 'POST',
    //         headers: {
    //             // 'Accept': 'text/plain',
    //             'Content-Type': 'application/json',
    //             'Authorization' : token
    //         },
    //         body: JSON.stringify({
    //             "numberOfPlayers": numberOfPlayers,
    //             "playerMatSize": playerMatSize,
    //             "moveCardSet": moveCardSet
    //
    //         })
    //     })
    //     .then(response => {
    //         if (response.status === 201){
    //             window.Location = '../html/game.html';
    //             window.alert("success");
    //         }
    //         else {
    //             window.alert("error");
    //             throw new Error('Error');
    //         }
    //     })
    //     .catch(error => {
    //        console.error("Fetch error:", error.message);
    //         //throwCode(error.message)
    //     });
    // })
})

const numberOfPlayers = 2;
const playerMatSize = 5;
const moveCardSet = 0;
const makeTableButton = document.getElementById('makeTableButton');
makeTableButton.addEventListener('click', (e) => {
    e.preventDefault();
    const token = localStorage.getItem('sessionID');

    fetch('https://localhost:5051/api/Tables', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'text/plain',
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'numberOfPlayers': numberOfPlayers,
            'playerMatSize': playerMatSize,
            'moveCardSet': moveCardSet,
        })
    })
    .then((response) => {
                if (response.status === 201){
                    //window.location.href = '../html/game.html';
                    window.alert("success");
                    console.log(response.json())
                    const tableId = response.id;
                    console.log(tableId)
                    localStorage.setItem('tableId', tableId)
                }
                else {
                    window.alert("error");
                    throw new Error('Error');
                }
    })

    .catch((error) => {
        console.error("Fetch error:", error);
    })
})