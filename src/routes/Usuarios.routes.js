import {Router} from 'express'
import {getEmployee, getEmployees, createUser, deleteEmployee, updateUser} from '../controllers/Usuarios.controller.js'

const router = Router()

router.get('/employees', getEmployee);

router.get('/employees/:id', getEmployees);

router.post('/employees',createUser);

router.put('/employees/:id', updateUser);

router.delete('/employees/:id',deleteEmployee);

export default router
