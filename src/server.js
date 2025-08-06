import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import ticketRouter from './routes/ticket.routes.js';
import passwordRouter from './routes/password.routes.js';
import passport from "passport";
import { iniciarPassport } from "./config/passport.config.js";
import sessionRouter from './routes/session.routes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT ;

app.use(express.json()); 
app.use(express.static('public')); 


 app.get('/', (req, res) => {
    res.send('Servidor funcionando 👋');
});

// Conectar a la base de datos
connectDB();


// Rutas de usuarios
app.use('/api/users', userRouter);
// Rutas de sesiones
app.use('/api/sessions', sessionRouter);
// Rutas de productos
app.use('/api/products', productRouter);
// Rutas de carritos
app.use('/api/carts', cartRouter);

// Rutas de tickets
app.use('/api/tickets', ticketRouter);
// Rutas de recuperación de contraseña
app.use('/api/password', passwordRouter);


app.use(passport.initialize());

iniciarPassport();


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
