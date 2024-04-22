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
        fetch('https://localhost:8080/api/Authentication/register', {
                method: "POST",
                mode: "cors",
                headers: {
                    'content-type': 'application/json'
                },
                //here we are going to make a json file, because we do the fetch with a json file
                body: JSON.stringify(
                    {
                        username: userName.value,
                        email: email.value,
                        password: password.value
                    }
                )
            }
        )
            .then(response =>{
            if (!response.ok){
                alert("het bestaat al")
            }
            })
    }
}
function validatePassword(password, repeat_Password){
    //Here we are first going to look if the passwords are equal to eachother
    if (password.trim() !== repeat_Password.trim()) {
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
