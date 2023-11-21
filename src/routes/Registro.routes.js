import {router} from "express";
import { reportarRegistro, verRegistros } from "../controllers/Registro.controller";

const router = router();

router.post('/reportarRegistro', reportarRegistro);

router.get('/verRegistros', verRegistros);

export default router;