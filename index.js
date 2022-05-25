const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const themeRoute = require("./routes/themeData");
const cors = require("cors");


const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/themeData", themeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });

