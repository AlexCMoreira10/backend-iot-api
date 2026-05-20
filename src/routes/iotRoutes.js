import express from 'express';
import { salvarDados } from '../controllers/iotControllers.js';


const router = express.Router();


//ver como configurei esse rota no app de celular
router.get('/iot', (req, res) => {
    res.json({ message: 'Rota GET para IoT funcionando!' });
});
router.post('/iot', salvarDados);

export default router;