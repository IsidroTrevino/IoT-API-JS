import { pool } from '../db.js'

export const getUser = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM Usuario');
    res.json(result);
}