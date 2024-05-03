document.getElementById('join-button').addEventListener('click', function (event){
    event.preventDefault()
    const tableid = localStorage.getItem('tableId');
    const sessionID = localStorage.getItem('sessionID');
    fetch(`https://localhost:5051/api/Tables/${tableid}/join`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (!response.ok){
                throw new Error("error")
            }
            return response.json()
        })
        .then(data =>{
            console.log(data)
            if (data.status === 404){
                console.log("This table is not found")
            }
            if (data.status === 200){
                console.log("You just joined the table succesfully")
                setTimeout(function (){
                    window.location.href = '../html/game.html'
                }, 1000)
            }

        })
})