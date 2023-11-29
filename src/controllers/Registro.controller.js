import {pool} from '../db.js'

export const reportarRegistro = async (req, res) => {
    const {idDisp, lecturaSensor, accionTomada} = req.body;
    const [rows] = await pool.query('call reportarRegistro(?,?,?)',[idDisp, lecturaSensor, accionTomada])
    res.send ({
        id: rows.insertId,
        idDisp: idDisp,
        lecturaSensor: lecturaSensor,
        accionTomada: accionTomada
    });
}

export const verRegistros = async (req,res) => {
    const {idDisp} = req.params;
    const [result] = await pool.query('call verRegistros(?)',[idDisp])

	let registros = result[0].reverse();

    res.json(registros);
}

export const borrarRegistros = async (req, res) => {
	const {idDisp} = req.params;
	
	const [result] = await pool.query('call borrarRegistros(?)', [idDisp]);
	res.sendStatus(200);
	
}