const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MERN',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
