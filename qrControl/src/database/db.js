const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectándose a MongoDB', err);
    throw err;
  }
};

module.exports = connectDB;