const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./app/utils/db');
const carsRouter = require('./app/routes/carRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(carsRouter);

dbConnect();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
