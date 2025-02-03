require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoute = require("./routes/authRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.get("/api/test", authMiddleware, (req, res) => {
  console.log("Hiii");

  res.send("Radhe radhe");
});

connectDB().then(() => {
  console.log(`Connected to DB succesfully!`);
  app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
  });
});
