import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {server} from '../App';
import { useUser } from '../hooks/useUser';

const SignUp = () => {

	const {setUser} = useUser();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		nombre: '',
		apellido: '',
		username: '',
		password: ''
	});
	const [error, setError] = useState(false);

	const updateInput = (e) => {
		setError(false);
		setForm({
			...form,
			[e.target.id]: e.target.value
		});
	}

	const submit = () => {

		const apiUrl = `http://${server}:3000/api/agregarUsuario`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: form.nombre,
                apellido: form.apellido,
                nombreUsuario: form.username,
                contrasena: form.password
            }),
        })
        .then(response => response.json())
        .then(userData => {
			console.log("Created user");
			console.log(userData);
			setUser(userData);
			navigate("/home");
        })
        .catch(error => {
            console.error('Error:', error);
			setError(true);
        });

	}

	return (
		<div className="center-container">
			<div className="login-container">
				<h2>Sign up</h2>
				<form id="login-form">
					<div className="input-group">
						<label htmlFor="nombre">Nombre</label>
						<input type="text" id="nombre" name="nombre" required onChange={updateInput} value={form.nombre} />
					</div>
					<div className="input-group">
						<label htmlFor="apellido">Apellido</label>
						<input type="text" id="apellido" name="apellido" required onChange={updateInput} value={form.apellido} />
					</div>
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" name="username" required onChange={updateInput} value={form.username} />
					</div>
					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" required onChange={updateInput} value={form.password} />
					</div>
					<button type="button" onClick={submit}>Sign up</button>
					<Link to="/" className="signup-link">Already have an account?</Link>
				</form>
				{error && <p id="error-message" style={{color: 'red'}}>Username already taken.</p>}
			</div>
		</div>
	)
}

export default SignUp;