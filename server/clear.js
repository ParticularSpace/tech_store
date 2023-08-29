const mongoose = require('mongoose');
const { User } = require('./src/models/User'); // Make sure this path is correct

const uri = "";

const clearUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("Cleared all users.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
  mongoose.connection.close();
};

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Successfully connected to MongoDB");
    await clearUsers();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
