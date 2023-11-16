import {Router} from 'express'
import {pool} from '../db.js'
const router = Router()

router.get('/getUser', async (req, res) => {
    const [result] = await pool.query('SELECT * FROM Usuario AS Usuarios');
    res.json(result);
});


export default router
