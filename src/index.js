import express from 'express'
import usuariosRoutes from './routes/Usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
const app = express();


app.use(usuariosRoutes);
app.use(indexRoutes);


app.listen(3000)

console.log("Server on port 3000")