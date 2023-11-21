import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/Usuarios.routes.js';
import casasRoutes from './routes/Casa.routes.js';
import dispositivosRoutes from './routes/Dispositivo.routes.js';
import fallasRoutes from './routes/Falla.routes.js';
import horariosRoutes from './routes/Horarios.routes.js';
import registroRoutes from './routes/Registro.routes.js';
import comandoRoutes from './routes/Comando.routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', usuariosRoutes);

app.use('/api', casasRoutes);

app.use('/api', dispositivosRoutes);

app.use('/api', fallasRoutes);

app.use('/api', horariosRoutes);

app.use('/api', registroRoutes);

app.use('/api', comandoRoutes);


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
