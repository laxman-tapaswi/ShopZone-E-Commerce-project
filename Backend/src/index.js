const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

dotenv.config();
const PORT = 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`App error !! ${error}`);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connect with app and database ${error}`);
  });
