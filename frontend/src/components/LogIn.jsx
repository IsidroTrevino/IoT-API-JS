import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {server} from '../App';
import { useUser } from '../hooks/useUser';

const LogIn = () => {

	const {setUser} = useUser();
	const navigate = useNavigate();

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
            if (userData.nombreUsuario) {
                // Se encontró un usuario coincidente
                // window.location.href = 'Dashboard.html'; // Redirigir al dashboard
				console.log("Logged in");
				setUser(userData);
				console.log(userData);
				navigate("/home");
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
		<div className="center-container">
			<div className="login-container">
				<h2>Login</h2>
				<form id="login-form">
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" name="username" required onChange={updateInput} value={form.username} />
					</div>
					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" required onChange={updateInput} value={form.password} />
					</div>
					<button type="button" onClick={submit}>Log in</button>
					<Link to="/signup" className="signup-link">Don't have an account?</Link>
				</form>
				{error && <p id="error-message" style={{color: 'red'}}>Incorrect username or password.</p>}
			</div>
		</div>
	)
}

export default LogIn;