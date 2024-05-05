//import { submitForm } from './login.js';

window.addEventListener("load", loaded);

function loaded(){
    let buttonRegister = document.getElementById('button-register');
    buttonRegister.addEventListener("click", validateRegister);
}

function validateRegister(){

    //Putting all the inputs of the html in variables
    let form = document.getElementById("form-register");
    let userName = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let repeat_Password = document.getElementById("repeat_Password");

    //Making a preventDefault(), this is because some methods have default inputs. This prevents that we get default inputs.
    form.addEventListener("submit", (e) => {
            e.preventDefault();
            //validateEmailInput(email.value);
            validatePassword(password.value, repeat_Password.value);
        }
    )

    if (validatePassword(password, repeat_Password)) {
        //Making fetch request for the reqister page
        fetch('https://localhost:5051/api/Authentication/register', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value,
                "wariorName": userName.value
            })
        })
            .then((response) => {
                console.log("response.status =", response.status);
                if(response.status === 200) {
                    console.log("successful register");
                    //automatisch inloggen na registreren:
                    submitForm(email.value, password.value);

                }
                else{
                    //If there is a different response then the 200 status code, it will give the message from the error
                    response.json().then(data => {

                        console.log("Error message:", data.message);
                        //alert("Error: " + data.message);
                        //we are doing this because we can't use alerts
                        throwaCode(data.message)
                    });
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error.message);
                throwaCode(error.message)
            })

    }
}
function throwaCode(text){
    //So first we take the element where we want to insert it in to, after we clear it this is to prevent if you do something twice
    //that it doesn't add it and makes a mess. After clearing it we will add the error message
    let place = document.getElementById('error-code-handler-register');
    place.innerHTML = '';
    place.insertAdjacentHTML("afterbegin", text)

}
    function validatePassword(password, repeat_Password){
        //Here we are first going to look if the passwords are equal to eachother
        if (password.value !== repeat_Password.value) {

            throwaCode("Passwords do not match.")
            return false;
        }
        else{
            return  true;
        }
    }


function submitForm(email, password) {
    fetch('https://localhost:5051/api/Authentication/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then((response) => {
        console.log("response status =", response.status);
        if (response.status === 200) {
            response.json().then(data => {
                const sessionID = data.token;
                localStorage.setItem('sessionID', sessionID); //TODO
                // console.dir(data.token)
                console.log("succesful login");

            })
            setTimeout(function () {
                window.location.href = '../html/lobby.html';
            }, 100);
        }

    })
        .catch((error) => {
        console.log(error);
    });
}