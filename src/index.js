import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/Usuarios.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use('/api', usuariosRoutes);
app.use('/api', indexRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
