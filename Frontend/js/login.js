window.addEventListener("load", loaded)

function loaded(){
    let buttonlogin = document.getElementById('submitButton');
    buttonlogin.addEventListener("click", login )
}
    /*document.getElementById("submitButton").addEventListener('submit', function (event) {
        event.preventDefault();
        var emailInput = document.getElementById('emailInput');
        var passwordInput = document.getElementById('passwordInput');
        //validate input
        if (!emailInput.value || !passwordInput.value) { //TODO temporary check -> @lucasProfeta
            window.alert("Fill in email and password before logging in");
            throw new Error("Login fault"); //exit function
        }
    })*/
function login(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let form = document.getElementById("form");

    /*form.addEventListener("submit", (e)=>{
        //This will prevent that there will be default inputs
        e.preventDefault()
    })*/
    fetch('https://localhost:5051/api/Authentication/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "email": email.value,
            "password": password.value
        })
    }).then((response) =>{
        console.log("response status =",response.status)
        //looking if the status is a good response or a bad response
        if (response.status === 200){
            console.log("succesful login");
            window.location = '../html/lobby.html';
        }
        else {
            //If there is a different code that the 200 it will put out an error code
            response.json().then(data => {
                console.log("Error message:", data.message);
                throwCode(data.message);
            })
        }
    }).catch((error) => {
        console.error("Fetch error:", error.message);
        throwCode(error.message)
    })
}
    function throwCode(text){
        //So first we take the element where we want to insert it in to, after we clear it this is to prevent if you do something twice
        //that it doesn't add it and makes a mess. After clearing it we will add the error message
        let place = document.getElementById("error-code-handler-login");
        place.innerHTML = '';
        place.insertAdjacentHTML("afterend", text);
    }
//})