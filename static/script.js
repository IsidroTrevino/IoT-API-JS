const server = "10.22.137.183";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const apiUrl = `http://${server}:3000/api/obtenerUsuario`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreUsuario: username,
                contrasena: password
            }),
        })
        .then(response => response.json())
        .then(userData => {
            if (userData && userData.length > 0) {
                // Se encontró un usuario coincidente
                window.location.href = 'Dashboard.html'; // Redirigir al dashboard
            } else {
                const errorMessage = 'Usuario o contraseña incorrectos.';
                console.log(response);
                document.getElementById('error-message').textContent = errorMessage;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = 'Usuario o contraseña incorrectos.';
            document.getElementById('error-message').textContent = errorMessage;
        });
    });
});
