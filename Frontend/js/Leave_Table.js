document.getElementById('leaveTable').addEventListener('click', function (event){
    const tableid = localStorage.getItem('tableId');
    const sessionID = localStorage.getItem('sessionID');
    fetch(` https://localhost:5051/api/Tables/${tableid}/leave`,{
        method: 'POST',
        mode: 'cors',
        headers:{
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
                console.log("You just left succesfully")
                setTimeout(function (){
                    document.getElementById("tableAvailability").hidden;
                    window.alert("h");
                    window.location.href = '../html/lobby.html'
                    var element = document.getElementById('tableAvailability');

                }, 1000)
            }
            else{
                console.log(data.status);
                console.log(data.json())
            }
        })
})