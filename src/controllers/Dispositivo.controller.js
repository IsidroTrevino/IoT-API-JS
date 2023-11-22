import { pool } from '../db.js'

export const agregarDisp = async (req, res) => {
    const {idCasa, macAddress, nombreDisp} = req.body;
    const [rows] = await pool.query('call agregarDisp(?,?,?)',[idCasa, macAddress, nombreDisp])
    res.send ({
        id: rows.insertId,
        idCasa: idCasa,
        macAddress: macAddress,
        nombreDisp: nombreDisp
    });
};

export const verDisps = async (req,res) => {   
    const {idCasa} = req.params;
    const [result] = await pool.query('call verDisps(?)',[idCasa])
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen dispositivos" })
    }

    res.json(result[0]);
}

export const verDisp = async (req,res) => {
    const {idDisp} = req.params;
    const [result] = await pool.query('call verDisp(?)',[idDisp])
    if (result.length == 0) {
        return res.status(400).json({ message: "No existe el dispositivo" })
    }
    res.json(result[0]);
}

export const eliminarDisp = async (req,res) => {
    const {idDisp} = req.body;
    const [result] = await pool.query('call eliminarDisp(?)',[idDisp]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe el dispositivo" })
    }
    res.send({
        id: idDisp,
        existe: false
    });
}

