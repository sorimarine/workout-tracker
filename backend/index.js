const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();

//connect to mongodb
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

app.use(
  session({
    secret: "should put this in dotenv at some point",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use("/api", routes);

const port = 9000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
