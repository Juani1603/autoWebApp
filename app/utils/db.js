const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'Amaya',  
    });
    console.log('✅ Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('❌ Error en la conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
