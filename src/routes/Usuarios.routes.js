import {Router} from 'express'
import {getEmployee, getEmployees, createUser, deleteEmployee, updateEmployee} from '../controllers/Usuarios.controller.js'

const router = Router()

router.get('/employees', getEmployee);

router.get('/employees/:id', getEmployees);

router.post('/employees',createUser);

router.put('/employees', updateEmployee);

router.delete('/employees',deleteEmployee);

export default router
