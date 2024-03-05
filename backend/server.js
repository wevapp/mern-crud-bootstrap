require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleDateString()} ${req.method}:${req.url}`);
  next();
});

// Routes here //
// Item route
app.use("/api/item", require("./routes/crudRoutes"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "crud" })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected and Running server on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
