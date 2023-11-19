import { pool } from '../db.js'

export const agregarCasa = async (req, res) => {
    const {idUsuario, nombreCasa, nombreRed, contrasenaRed} = req.body;
    const [rows] = await pool.query('INSERT INTO Casa (idUsuario, nombreCasa, nombreRed, contrasenaRed) VALUES (?, ?, ?, ?)',[idUsuario, nombreCasa, nombreRed, contrasenaRed])
    res.send ({
        id: rows.insertId,
        idUsuario: idUsuario,
        nombreCasa: nombreCasa,
        nombreRed: nombreRed,
        contrasenaRed: contrasenaRed
    });
}

export const verCasas = async (req,res) => {
    const {idUsuario} = req.body;
    const [rows] = await pool.query('SELECT * FROM Casa WHERE idUsuario = ? AND existe = TRUE',[idUsuario])
    if (rows.length == 0) {
        return res.status(400).json({ message: "No existen casas" })
    }

    res.send(rows);
}

export const verCasa = async (req,res) => {
    const {idCasa} = req.body;
    const [rows] = await pool.query('SELECT * FROM Casa WHERE idCasa = ? AND existe = TRUE',[idCasa])
    if (rows.length == 0) {
        return res.status(400).json({ message: "No existe la casa" })
    }
    res.send(rows);
}

export const modificarCasa = async (req,res) => {
    const {idCasa, nombreCasa, nombreRed, contrasenaRed} = req.body;
    const [result] = await pool.query('UPDATE Casa SET nombreCasa = ?, nombreRed = ?, contrasenaRed = ? WHERE idCasa = ?',[nombreCasa, nombreRed, contrasenaRed, idCasa]);
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
    const [result] = await pool.query('UPDATE Casa SET existe = FALSE WHERE idCasa = ?',[idCasa]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe la casa" })
    }
    res.send({
        id: idCasa,
        existe: false
    });
}

