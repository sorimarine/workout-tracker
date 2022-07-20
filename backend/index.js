const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
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

const store = new MongoDBSession({
  uri: mongoString,
  collection: "mySessions",
});
const sessionSecret = process.env.SESSION_SECRET;
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
