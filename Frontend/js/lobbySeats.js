
document.addEventListener('DOMContentLoaded', function (){
    /*const sessionID = document.cookie
        .split('; ')
        .find(row => row.startsWith('sessionID='))
        .split('=')[1];
     */
    const sessionID = localStorage.getItem('sessionID');
        fetch('https://localhost:5051/api/Tables/with-available-seats',{
        method: 'GET',
        headers:{
            'Authorization' : `Bearer ${sessionID}`
        }
    })
        .then(response =>{
            if (!response.ok){
                throw new Error("network response was not ok")
            }
            return response.json();
        })
        .then(data =>{
            console.log(data)
        })
})

function freeTables(tableid){

}