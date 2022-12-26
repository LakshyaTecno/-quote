const { application } = require("express");
const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");
const bodyparser = require("body-parser");
const dbconfig = require("./configs/db.config");
const { default: mongoose } = require("mongoose");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(dbconfig.DB_URL);
mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connected to mongodb");
});

db.once("open", () => {
  console.log("connected to mongodb");
  //init();
});
app.listen(serverConfig.PORT, () => {
  console.log("Started the server on the PORT number :", serverConfig.PORT);
});
