const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

const investmentRoutes = require('./routes/investment');
app.use('/api/investment', investmentRoutes);

// Conectar a BD
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado correctamente a la BD'))
  .catch((error) => {
    console.error('Error al conectar:', error.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('API funcionando desde Express');
});

app.listen(PORT, () => {
  console.log(`Puerto: http://localhost:${PORT}`);
});
