fetch("https://{host}:{port}/api/Tables",
    { method: "POST",
        body: JSON.stringify("input"), //TODO change input
        headers: {
        'Accept': 'Application/json',
            'Content-Type': 'Application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 201){
            return response.json();
        }
        else {
            window.alert("Error, system fault");
            throw new Error("Error, system fault"); //exit function
        }
    })
    .catch(error => {
        //TODO errorhandling
        window.alert('Your account is not registered yet, please make an account first.' + error);
    });
