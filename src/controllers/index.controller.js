import { pool } from '../db.js'

export const getUser = async (req, res) => {
    const [result] = await pool.query('SELECT Usuario.nombre, Usuario.apellido FROM Usuario');
    res.json(result[0]);
}