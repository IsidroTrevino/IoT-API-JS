import { useState } from 'react';

const server = "10.22.137.183";

const LogIn = () => {

	const [form, setForm] = useState({
		username: '',
		password: ''
	});
	const [error, setError] = useState(false);

	const submit = () => {

        const apiUrl = `http://${server}:3000/api/obtenerUsuario`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreUsuario: form.username,
                contrasena: form.password
            }),
        })
        .then(response => response.json())
        .then(userData => {
            if (userData && userData.length > 0) {
                // Se encontró un usuario coincidente
                // window.location.href = 'Dashboard.html'; // Redirigir al dashboard
				console.log("Logged in");
            } else {
				console.error('Error:', error);
				setError(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
			setError(true);
        });
	}

	const updateInput = (e) => {
		setError(false);
		setForm({
			...form,
			[e.target.id]: e.target.value
		});
	}

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form id="login-form">
				<div className="input-group">
					<label for="username">Username</label>
					<input type="text" id="username" name="username" required onChange={updateInput} value={form.username} />
				</div>
				<div className="input-group">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required onChange={updateInput} value={form.password} />
				</div>
				<button type="button" onClick={submit}>Log in</button>
			</form>
			{error && <p id="error-message" style={{color: 'red'}}>Usuario o contraseña incorrectos.</p>}
		</div>
	)
}

export default LogIn;