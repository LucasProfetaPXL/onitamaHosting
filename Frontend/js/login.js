// window.addEventListener("load", loaded)
//
// function loaded(){
//     let buttonlogin = document.getElementById('submitButton');
//     buttonlogin.addEventListener("click", login )
// }
//     /*document.getElementById("submitButton").addEventListener('submit', function (event) {
//         event.preventDefault();
//         let email = document.getElementById('emailInput');
//         let password = document.getElementById('passwordInput');
//         let form = document.getElementById("form");
//         //validate input
//         if (!emailInput.value || !passwordInput.value) { //TODO temporary check -> @lucasProfeta
//             window.alert("Fill in email and password before logging in");
//             throw new Error("Login fault"); //exit function
//         }
//     })*/
// function login(){
//     let email = document.getElementById('emailInput');
//     let password = document.getElementById('passwordInput');
//     let form = document.getElementById("form");
//
//     /*form.addEventListener("submit", (e)=>{
//         //This will prevent that there will be default inputs
//         e.preventDefault()
//     })*/
//     fetch('https://localhost:5051/api/Authentication/token', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             "email": email.value,
//             "password": password.value
//         })
//     }).then((response) =>{
//         console.log("response status =",response.status)
//         //looking if the status is a good response or a bad response
//         window.location = '../html/lobby.html';
//         // if (response.status === 200){
//         //     response.json().then(data =>{
//         //         const sessionID = data.sessionId;
//         //         localStorage.setItem('sessionID', sessionID);
//         //         console.log(sessionID)
//         //         console.log("succesful login");
//         //     })
//            setTimeout(function() {
//                window.location.href = '../html/lobby.html';
//            }, 100);
//         //
//         // }
//         // else {
//         //     //If there is a different code that the 200 it will put out an error code
//         //     response.json().then(data => {
//         //         console.log("Error message:", data.message);
//         //         throwCode(data.message);
//         //     })
//         // }
//     }).catch((error) => {
//         console.error("Fetch error:", error.message);
//         throwCode(error.message)
//     })
// }
//     function throwCode(text){
//         //So first we take the element where we want to insert it in to, after we clear it this is to prevent if you do something twice
//         //that it doesn't add it and makes a mess. After clearing it we will add the error message
//         let place = document.getElementById("error-code-handler-login");
//         place.innerHTML = '';
//         // place.insertAdjacentHTML("afterend", text);
//         place.insertAdjacentHTML("afterbegin", text); //This fixes the multiple error messages
//     }
// //})
import {toastHandler} from "./toast.js";

const loginBtn = document.querySelector('#submitButton');
let toast = document.querySelector('#toast');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    if (validateForm(emailInput, passwordInput)) {
        submitForm(emailInput.value, passwordInput.value);
    }
});

function validateForm(emailInput, passwordInput) {
    if (emailInput.value.trim() === '') {
        toast.firstChild.remove();
        toast.innerHTML = 'Please enter a email address';
        toastHandler();
        return false;
    }

    if (passwordInput.value.trim() === '') {
        toast.firstChild.remove();
        toast.innerHTML = 'Please enter a password';
        toastHandler();
        return false;
    }

    return true;
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
                sessionStorage.setItem('sessionID', sessionID); //TODO
                console.dir(data.token)
                console.log("succesful login");

            })
            setTimeout(function () {
                window.location.href = '../html/lobby.html';
            }, 100);
        }
    }).catch((error) => {
        console.log(error);
    });
}