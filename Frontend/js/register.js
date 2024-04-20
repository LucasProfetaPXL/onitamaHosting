window.addEventListener("load", loaded);

function loaded(){
    let buttonRegister = document.getElementById('button-register');
    buttonRegister.addEventListener("click", validateRegister);
}

function validateRegister(){

    //Putting all the inputs of the html in variables
    let form = document.getElementById("form");
    let userName = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let repeat_Password = document.getElementById("repeat_Password");

    //Making a preventDefault(), this is because some methods have default inputs. This prevents that we get default inputs.
    form.addEventListener("submit", (e) => {
            e.preventDefault();
            validateEmailInput(email.value);
            validatePassword(password, repeat_Password);
        }
    )
    email.addEventListener("change", (e) => {
        setTimeout(() => validator.isEmail(), 2000);
    });



}
function validatePassword(password, repeat_Password){
    //Here we are first going to look if the passwords are equal to eachother
    if (password.value.trim() !== repeat_Password.value.trim()) {
        alert("Passwords do not match.");
    }
    //Now we're going to
}
function validateEmailInput(email) {
    if (!validator.isEmail(email)) {
        alert("Invalid email address.");
    }
}

function validateUsername(username){

}
