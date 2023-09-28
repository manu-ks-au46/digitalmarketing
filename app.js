const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./dbConfig");
const userRouter = require("./routes/userRoute");

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Route middlewares
app.use("/api/users", userRouter);

//Server
PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server started and listening to port number : ${PORT}`);
    connectDB();
  } else {
    console.log(`server failed to start at port number : ${PORT}`);
  }
});
