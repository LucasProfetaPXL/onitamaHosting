let name = document.querySelector("#player_name");

document.addEventListener('DOMContentLoaded', function (){
    function fetchTableAvailability() {
        const sessionID = sessionStorage.getItem('sessionID');
        fetch('https://localhost:5051/api/Tables/with-available-seats', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionID}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("network response was not ok")
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (data && data.length === 0) {
                    throwaCode("No available tables");
                }
                else{
                    showAvailableSeats();
                    name.insertAdjacentHTML("beforeend", data[0].seatedPlayers[0].name);
                }
            })

    }
    fetchTableAvailability()
    const makeTableButton = document.getElementById('maketablebutton');
    if (makeTableButton) {
        makeTableButton.addEventListener('click', function() {
            // Call the function again to fetch table availability
            fetchTableAvailability();
        });
    }
});
function throwaCode(text){
    //So first we take the element where we want to insert it in to, after we clear it this is to prevent if you do something twice
    //that it doesn't add it and makes a mess. After clearing it we will add the error message
    let place = document.getElementById('tableAvailability');
    place.innerHTML = '';
    place.insertAdjacentHTML("afterbegin", `<span style="color: black; font-weight: bold; font-size: larger;">${text}</span>`)
}

function showAvailableSeats(){
    const text = document.createElement('p');
    text.textContent = 'Available Seat';

    const joinBtn = document.getElementById("join_Button");
    joinBtn.style.display = 'block';

    const tableAvailable = document.getElementById('tableAvailability');
    tableAvailable.insertAdjacentElement('afterbegin',text);
}