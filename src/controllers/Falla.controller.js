import {pool} from '../db.js'

export const reportarFalla = async (req, res) => {
    const {idDisp, descripcionFalla} = req.body;
    const [rows] = await pool.query('call reportarFalla(?,?)',[idDisp, descripcionFalla])
    res.send ({
        id: rows.insertId,
        idDisp: idDisp,
        descripcionFalla: descripcionFalla
    });
}

export const verFallas = async (req,res) => {
    const {idDisp} = req.body;
    const [result] = await pool.query('call verFallas(?)',[idDisp])
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen fallas" })
    }

    res.json(result);
}
