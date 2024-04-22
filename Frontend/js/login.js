    document.addEventListener('DOMContentLoaded', function(){
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

        const email =  document.getElementById('email');
        const password = document.getElementById('password');

        fetch('https://localhost:5051/api/Authentication/token', {
            method: 'POST',
            headers: {
            //?
            },
            body: JSON.stringify({email, password})
            }) // TODO email & password moeten veranderd worden in de variabelen van index.html
            .then(response => response.json())
            .then(response => {
                if (response.readyState == XMLHttpRequest.DONE && response.status == 200){
                    window.Location = '../lobby.html';
                }
                else{
                    throw new Error('Foute logingegevens')
                }
            })
            .catch(Error => {
                document.getElementById('password').innerHTML == Error.message; // TODO password vervangen door id van passwordfield
            });


            const formData = new FormData(this);

            // Convert form data to JSON object
            const data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            // fetch naar backand
            fetch('https://{host}:{port}/api/Authentication/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    window.alert("Error, network fault");
                    throw new Error("Login incorrect; network fault"); //exit function
                }
                return response.json();
            })
            .then(data => {
                window.alert('succesfull login' + data);
                //TODO what to do when succesfull login?
            })
            .catch(error => {
                //TODO errorhandling
                window.alert('Your account is not registered yet, please make an account first.' + error);
            });
    })