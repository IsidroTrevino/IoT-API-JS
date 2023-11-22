import { pool } from '../db.js'


export const agregarUsuario = async (req, res) => {

    const { nombreUsuario, contrasena, nombre, apellido } = req.body;

    const [result] = await pool.query('SELECT nombreUsuario FROM Usuario WHERE nombreUsuario = ?', [nombreUsuario]);

    if (result[0]){
        res.status(400).send("El usuario ya existe")
        return;
    }

    const [rows] = await pool.query('call agregarUsuario(?,?,?,?)',[nombreUsuario, contrasena, nombre, apellido]);

    res.send({
        idUsuario: rows[0][0].idUsuario,
        nombreUsuario: nombreUsuario,
        nombre: nombre,
    })
}

export const obtenerUsuario = async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const [result] = await pool.query('call obtenerUsuario(?,?)', [nombreUsuario, contrasena])
    if (result.length === 0) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    res.json({
        idUsuario: result[0][0].idUsuario,
        nombreUsuario: result[0][0].nombreUsuario,
        nombre: result[0][0].nombre,
        apellido: result[0][0].apellido
});
}




