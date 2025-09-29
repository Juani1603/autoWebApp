const mongoose = require("mongoose");

let isConnected = false; 

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (isConnected) return;

  if (global.mongoose.conn) {
    isConnected = true;
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(process.env.MONGO_URL, {
      dbName: "Amaya",
    }).then((m) => m);
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    isConnected = true;
    console.log("✅ Conexión exitosa a MongoDB");
    return global.mongoose.conn;
  } catch (error) {
    console.error("❌ Error en la conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
