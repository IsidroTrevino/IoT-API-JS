import {pool} from '../db.js'

export const agregarHorario = async (req, res) => {
    const {idDisp, diaSemana, horaInicio,horaFinal,accion} = req.body;
    const [rows] = await pool.query('call agregarHorario(?,?,?,?,?)',[idDisp, diaSemana, horaInicio,horaFinal,accion])
    res.send ({
        id: rows.insertId,
        idDisp: idDisp,
        diaSemana: diaSemana,
        horaInicio: horaInicio,
        horaFinal: horaFinal,
        accion: accion
    });
};

export const modificarHorario = async (req,res) => {
    const {idHorario, diaSemana, horaInicio,horaFinal,accion} = req.body;
    const [result] = await pool.query('call modificarHorario(?,?,?,?,?)',[diaSemana, horaInicio,horaFinal,accion,idHorario]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe el horario" })
    }
    res.send({
        id: idHorario,
        diaSemana: diaSemana,
        horaInicio: horaInicio,
        horaFinal: horaFinal,
        accion: accion
    });
}

export const eliminarHorario = async (req,res) => {
    const {idHorario} = req.body;
    const [result] = await pool.query('call eliminarHorario(?)',[idHorario]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe el horario" })
    }
    res.send({
        id: idHorario,
        existe: false
    });
}

export const verHorarios = async (req,res) => {
    const {idDisp} = req.body;
    const [result] = await pool.query('call verHorarios(?)',[idDisp])
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen horarios" })
    }

    res.json(result);
}

