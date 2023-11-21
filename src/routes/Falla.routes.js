import { Router } from "express";
import { reportarFalla, verFallas } from "../controllers/Falla.controller";

const router = Router();

router.post('/reportarFalla', reportarFalla);

router.get('/verFallas', verFallas);

export default router;