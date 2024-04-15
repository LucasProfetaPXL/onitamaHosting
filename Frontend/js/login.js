document.addEventListener('login', Function()){ //TODO login moet veranderd worden door de login-knop naam


}
fetch('https://localhost:5051/api/Authentication/token', {
	method: 'POST',
	headers: {
		//?
	},
	body: JSON, stringify({ document.getElementById('email'), document.getElementById('password')}) // TODO email & password moeten veranderd worden in de variabelen van index.html
	.then(response => response.json())
	.then(response => {
		if (response.readyState == XMLHttpRequest.DONE && response.status == 200){
			window.Location = '../lobby.html';
		}
		else{
			throw new Error('Foute logingegevens')
		}
	}
	.catch(Error => {
		document.getElementById('password').innerHTML == Error.message; // TODO password vervangen door id van passwordfield
	}
}



//TODO: check als velden (email & password) zijn ingevuld