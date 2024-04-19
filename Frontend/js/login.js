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
    });
});