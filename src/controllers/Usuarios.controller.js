import { pool } from '../db.js'

export const getEmployee = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Usuario')
    res.json(rows)
}


export const getEmployees = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE idUsuario = ?', [req.params.id])

    if (rows.length <= 0) return res.status(404).json({ message: "Usuario no encontrado" })
    res.send(rows[0])
}




export const createUser = async (req, res) => {

    const {nombreUsuario, contrasena, nombre, apellido} = req.body;
    if (nombreUsuario == null || contrasena == null || nombre == null || apellido == null) {
        return res.status(400).send('Falta información')
    } 
    if (nombreUsuario.length > 45 || contrasena.length > 45 || nombre.length > 45 || apellido.length > 45) {
        return res.status(400).send('Información demasiado larga')
    }
    if (nombreUsuario.length < 5 || contrasena.length < 5) {
        return res.status(400).send('Información demasiado corta')
    }
    // check if it is a string
    if (typeof nombreUsuario !== 'string' || typeof contrasena !== 'string' || typeof nombre !== 'string' || typeof apellido !== 'string') {
        return res.status(400).send('Información no válida')
    }
    // check if user exists
    if (await pool.query('SELECT * FROM Usuario WHERE nombreUsuario = ?', [nombreUsuario]).then(([rows]) => rows.length > 0)) {
        return res.status(400).send('Usuario ya existe')
    }
    const [rows] = await pool.query('INSERT INTO Usuario (nombreUsuario, contrasena, nombre, apellido) VALUES (?, SHA2(?, 256), ?, ?)',[nombreUsuario, contrasena, nombre, apellido])
    res.send({
        id: rows.insertId,
        name: nombreUsuario,
        password: contrasena,
        nombre: nombre,
    })
}

export const updateUser = async (req, res) => {
    const { idUsuario } = req.params;
    const { nombreUsuario, contrasena, nombre, apellido } = req.body;
    const [result] = await pool.query(
        'UPDATE Usuario SET nombreUsuario = ?, contrasena = SHA2(?, 256), nombre = ?, apellido = ? WHERE idUsuario = ?',
        [nombreUsuario, contrasena, nombre, apellido, idUsuario]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] =  pool.query('SELECT * FROM Usuario WHERE idUsuario = ?', [idUsuario])

    res.json(rows);
};



export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Usuario WHERE idUsuario = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(204)
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
