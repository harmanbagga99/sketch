const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const globalErrorHandler = require("./controllers/errorController");
const authRoutes = require("./routes/authRoute");
const sketchRoutes = require("./routes/sketchRoute");

const moongose = require("mongoose");
const AppError = require("./utils/appError");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
moongose
  .connect("mongodb://localhost:27017/sketch", {
    useNewUrlParser: true,
    useCsreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("err", err);
  });
app.use("/auth", authRoutes);
app.use("/sketch", sketchRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
