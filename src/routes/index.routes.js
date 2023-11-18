import {Router} from 'express'
import {pool} from '../db.js'
import {getUser} from '../controllers/index.controller.js'
const router = Router()

router.get('/getUser', getUser);

export default router
