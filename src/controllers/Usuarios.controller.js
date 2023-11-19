import { pool } from '../db.js'


export const agregarUsuario = async (req, res) => {
    const { nombreUsuario, contrasena, nombre, apellido } = req.body;
    const [rows] = await pool.query('INSERT INTO Usuario (nombreUsuario, contrasena, nombre, apellido) VALUES (?, SHA2(?, 256), ?, ?)',[nombreUsuario, contrasena, nombre, apellido])
    res.send({
        id: rows.insertId,
        name: nombreUsuario,
        password: contrasena,
        nombre: nombre,
    })
}

export const obtenerUsuario = async (req,res) => {
    const {nombreUsuario, contrasena} = req.body;
    const [result] = await pool.query('SELECT Usuario.nombreUsuario, Usuario.contrasena FROM Usuario WHERE nombreUsuario = ? AND contrasena = SHA2(?, 256)',[nombreUsuario, contrasena])
    if (result.length == 0) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" })
    }
    res.json(result)
}



