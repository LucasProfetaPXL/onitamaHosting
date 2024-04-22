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
            //validateEmailInput(email.value);
            validatePassword(password.value, repeat_Password.value);
        }
    )
    email.addEventListener("change", (e) => {
        setTimeout(() => validator.isEmail(), 2000);
    });
    if (validatePassword(password, repeat_Password)) {
        //Making fetch request for the reqister page
        fetch('https://localhost:5051/api/Authentication/register', {
            method: "POST",
            mode: "cors",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value,
                "wariorName": userName.value
            })
        })
            .then((response) => {
                console.log("response.status =", response.status);
                return response.blob();
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }
}
function validatePassword(password, repeat_Password){
    //Here we are first going to look if the passwords are equal to eachother
    if (password.value !== repeat_Password.value) {
        alert("Passwords do not match.");
        return false;
    }
    else{
        return  true;
    }
    //Now we're going to
}


function validateUsername(username){

}
