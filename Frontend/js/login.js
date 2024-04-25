window.addEventListener("load", loaded)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loginForm").addEventListener('submit', function (event) {
        event.preventDefault();
        var emailInput = document.getElementById('emailInput');
        var passwordInput = document.getElementById('passwordInput');
        //validate input
        if (!emailInput.value || !passwordInput.value) { //TODO temporary check -> @lucasProfeta
            window.alert("Fill in email and password before logging in");
            throw new Error("Login fault"); //exit function
        }
    })

    const email = document.getElementById('email');
    const password = document.getElementById('password');

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
        console.log(response.status)
        console.log(response.text())
    })

            /*console.log(response.status)
            if(response.status === 200){
                console.log("")
            }
            else{

            }*/

            // TODO email & password moeten veranderd worden in de variabelen van index.html
        /*
         //.then(response => response.json())
         .then(response => {
             if (response.readyState === XMLHttpRequest.DONE && response.status === 200){
                 window.Location = '../lobby.html';
                 console.log(response.text())
             }
             else{
                 throw new Error('Foute logingegevens')
             }
         })
         .catch(Error => {
             document.getElementById('password').innerHTML == Error.message; // TODO password vervangen door id van passwordfield
         })


         const formData = new FormData(this);

         // Convert form data to JSON object
         const data = {};
         formData.forEach(function (value, key) {
             data[key] = value;
         });*/

})