import {Router} from 'express'
import {getEmployee, createEmployee, deleteEmployee, updateEmployee} from '../controllers/Usuarios.controller.js'
const router = Router()
router.get('/employees', getEmployee);

router.post('/employees',createEmployee);

router.put('/employees', updateEmployee);

router.delete('/employees',deleteEmployee);

export default router
