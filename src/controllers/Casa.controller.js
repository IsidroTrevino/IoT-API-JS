import { pool } from '../db.js'

export const agregarCasa = async (req, res) => {
    const {idUsuario, nombreCasa, nombreRed, contrasenaRed} = req.body;
    const [rows] = await pool.query('call agregarCasa(?,?,?,?)',[idUsuario, nombreCasa, nombreRed, contrasenaRed])
    res.send ({
        id: rows.insertId,
        idUsuario: idUsuario,
        nombreCasa: nombreCasa,
        nombreRed: nombreRed,
        contrasenaRed: contrasenaRed
    });
}

export const verCasas = async (req,res) => {
    const {idUsuario} = req.params;
    const [result] = await pool.query('call verCasas(?)',[idUsuario])
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen casas" })
    }
    res.json(result[0]);
}

export const verCasa = async (req,res) => {
    const {idCasa} = req.params;
    const [rows] = await pool.query('call verCasa(?)',[idCasa])
    if (rows.length == 0) {
        return res.status(400).json({ message: "No existe la casa" })
    }
    res.json(rows[0]);
}

export const modificarCasa = async (req,res) => {
    const {idCasa, nombreCasa, nombreRed, contrasenaRed} = req.body;
    const [result] = await pool.query('call modificarCasa(?,?,?,?)',[nombreCasa, nombreRed, contrasenaRed, idCasa]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe la casa" })
    }
    res.send({
        id: idCasa,
        nombreCasa: nombreCasa,
        nombreRed: nombreRed,
        contrasenaRed: contrasenaRed
    });
}

export const eliminarCasa = async (req,res) => {
    const {idCasa} = req.body;
    const [result] = await pool.query('call eliminarCasa(?)',[idCasa]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe la casa" })
    }
    res.send({
        id: idCasa,
        existe: false
    });
}

