import e from 'express';
import { pool } from "../db.js";
import { mqttClient, publishTopic } from '../routes/Comando.routes.js';

export const agregarComando = async (req, res) => {
    const { idDisp, horaFin,accion,estado } = req.body;
    const [rows] = await pool.query("call agregarComando(?,?,?,?)", [idDisp, horaFin,accion,estado]);
    res.send({
        id: rows.insertId,
        idDisp: idDisp,
        comando: comando,
    });
};

export const verComandos = async (req, res) => {
    const { idDisp } = req.body;
    const [result] = await pool.query("call verComandos(?)", [idDisp]);
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen comandos" });
    }

    res.json(result);
}

export const verComandosPendientes = async (req, res) => {
    const { idDisp } = req.body;
    const [result] = await pool.query("call verComandosPendientes(?)", [idDisp]);
    if (result.length == 0) {
        return res.status(400).json({ message: "No existen comandos pendientes" });
    }

    res.json(result);
}

export const completarComando = async (req, res) => {
    const { idComando } = req.body;
    const [result] = await pool.query("call completarComando(?)", [idComando]);
    if (result.affectedRows == 0) {
        return res.status(400).json({ message: "No existe el comando" });
    }
    res.send({
        id: idComando,
        existe: false,
    });
}

export const mandarMqtt = async (req, res) => {
	const {comando} = req.body;
	try {
		await mqttClient.publishAsync(publishTopic, comando);
		res.status(200).json({mensaje: "Comando mandado"})
	} catch (err) {
		res.status(500).json({mensaje: "Error mandando comando"})
	}
}