import {Router} from 'express'  
import {agregarComando, verComandos, verComandosPendientes, completarComando, mandarMqtt} from '../controllers/Comando.controller.js'
import mqtt from 'mqtt';

const router = Router();

export const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");
export const publishTopic = "iot_equipo7/comandoLED";

router.post('/agregarComando', agregarComando);

router.get('/verComandos', verComandos);

router.get('/verComandosPendientes', verComandosPendientes);

router.put('/completarComando', completarComando);

router.post('/mqtt', mandarMqtt);

export default router;

