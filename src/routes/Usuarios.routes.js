import {Router} from 'express'
import {getEmployees, createEmployee, deleteEmployee, updateEmployee} from '../controllers/second.controller.js'
const router = Router()
router.get('/employees', getEmployees);

router.post('/employees',createEmployee);

router.put('/employees', updateEmployee);

router.delete('/employees',deleteEmployee);

export default router
