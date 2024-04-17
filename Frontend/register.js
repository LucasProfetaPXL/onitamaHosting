window.addEventListener("load", loaded);
//We import the isEmail because this can validate if it's a real email
import isEmail from "validator/es/lib/isEmail";
function loaded(){
    let buttonRegister = document.getElementById('button-register');
    buttonRegister.addEventListener("click", handleAllInputs);
}

function handleAllInputs(){
    // Putting all inputs in a variable
    let inputMailAdres = document.getElementById('inputMailAdres');
    let inputUsername = document.getElementById('inputUsername');
    let inputPassword = document.getElementById('inputPassword');
    let inputPasswordVerif = document.getElementById('inputPasswordVerif');

    //Making an array to put al the inputs are filled in.
    const notFilled = [];

    // If True it means that it's filled in, if there is a false it means that it's not filled in
    if (inputMailAdres.trim() !== ''){
        notFilled[0] = "True";
    }
    else{
        notFilled[0] = "False";
    }
    if (inputUsername.trim() !== ''){
        notFilled[1] = "True";
    }
    else{
        notFilled[1] = "False";
    }
    if (inputPassword.trim() !== ''){
        notFilled[2] = "True";
    }
    else{
        notFilled[2] = "False";
    }
    if (inputPasswordVerif.trim() !== ''){
        notFilled[3] = "True";
    }
    else{
        notFilled[3] = "False";
    }

    //looking if the email input is a valid email input, we have used an extension called "validator"
    if (notFilled[0] === "True"){
        const isValidMail = validator.isEmail(inputMailAdres)
    }
    t

}