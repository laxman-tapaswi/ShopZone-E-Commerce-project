const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(`${process.env.MONGO_URL}`);

    console.log(
      `Database conected successfully !!  Database host ${dbConnection.connection.host}`
    );
  } catch (error) {
    console.error(`Error while connect to db  !! ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
