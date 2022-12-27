const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");
const bodyparser = require("body-parser");
const dbconfig = require("./configs/db.config");
const mongoose = require("mongoose");
const User = require("./models/user.model");
app.use(bodyparser.json());
const users = require("./content/users");

app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(dbconfig.DB_URL);
mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connected to mongodb");
});

db.once("open", () => {
  console.log("connected to mongodb");
  init();
});

async function init() {
  try {
    // await User.collection.drop();
    console.log(users);
    const allUsers = await User.insertMany(users);
    console.log(allUsers);
  } catch (err) {
    console.log("err in db initialization", err.message);
  }
}

require("./routes/user.routes")(app);
app.listen(serverConfig.PORT, () => {
  console.log("Started the server on the PORT number :", serverConfig.PORT);
});
