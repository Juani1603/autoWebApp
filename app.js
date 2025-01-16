const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./app/utils/db');
const carsRouter = require('./app/routes/carRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));


app.use(express.json());
app.use(carsRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Conexión a la base de datos
dbConnect();

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
