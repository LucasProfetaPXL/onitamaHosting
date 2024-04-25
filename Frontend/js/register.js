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
                if(response.status === 200){
                    console.log("succesfull register")
                    window.location= "../html/index.html"
                }
                else{

                    response.json().then()
                    alert(response.json())
                    alert()
                }
                console.log("data = ", response)
                return response.blob();
            })
            .then(data=>{
                console.log(data.text())
            })
            .catch((error) => {
                console.error("Fetch error:", error.message);
            })

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
}


