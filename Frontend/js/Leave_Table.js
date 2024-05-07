document.getElementById('leaveTable').addEventListener('click', function (event){
    const tableid = localStorage.getItem('tableId');
    const sessionID = sessionStorage.getItem('sessionID');
    fetch(` https://localhost:5051/api/Tables/${tableid}/leave`,{
        method: 'POST',
        mode: 'cors',
        headers:{
            'Accept': '*/*',
            'Authorization': `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (!response.ok){
                throw new Error("error")
            }
            if (response.status === 200){
                // var element = document.getElementById('tableAvailability');
                console.log("You just left succesfully")
                // document.getElementById("tableAvailability").hidden;
                // window.alert("h");
                window.location = '../html/lobby.html'
            }
        })
        .catch((error) => {
            console.log(error);
        })
})