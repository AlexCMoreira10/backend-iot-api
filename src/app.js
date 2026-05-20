import express from 'express';
import cors from 'cors';
import iot from './routes/iotRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', iot);
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de IoT!');
});
export default app;