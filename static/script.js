fetch('http://localhost:3000/api/getUser') 
    .then(response => response.json())
    .then(users => {
        const usersBody = document.getElementById('users-body');

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombreUsuario}</td>
                <td>${user.nombre} ${user.apellido}</td>
                <td>${user.idUsuario}</td>
                <td>${user.contrasena}</td>
            `;
            usersBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching users data:', error);
    });