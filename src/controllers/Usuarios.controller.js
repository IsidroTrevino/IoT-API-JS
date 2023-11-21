import { pool } from '../db.js'


export const agregarUsuario = async (req, res) => {
    const { nombreUsuario, contrasena, nombre, apellido } = req.body;
    const [rows] = await pool.query('call agregarUsuario(?,?,?,?)',[nombreUsuario, contrasena, nombre, apellido])
    res.send({
        id: rows.insertId,
        name: nombreUsuario,
        password: contrasena,
        nombre: nombre,
    })
}

export const obtenerUsuario = async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const [result] = await pool.query('call obtenerUsuario(?,?)', [nombreUsuario, contrasena])
    if (result.length === 0) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    res.json(result[0]);
}




