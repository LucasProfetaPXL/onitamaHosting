document.getElementById('join_Button').addEventListener('click', function (event) {
    event.preventDefault()
    const tabled = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');
    fetch(`https://localhost:5051/api/Tables/${tabled}/join`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (!response.ok){
                console.log(response.json());
                throw new Error("error")
            }
            if (response.status === 200){
                console.log("You just joined the table succesfully")
                response.json().then(data => {
                    localStorage.setItem('hasSeats', data.hasAvailableSeat)
                })
                // setTimeout(function (){
                window.location = '../html/game.html'
                // }, 1000)
            }
            return response.json()
        })
        .catch((error) => {
            console.log(error);
        })
})