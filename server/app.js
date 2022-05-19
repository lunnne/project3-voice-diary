
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require("express");
const mongoose = require('mongoose');
const multer = require('multer');
const { createModel } = require('mongoose-gridfs');


let Attachment;
const app = express();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo Database name: "${x.connections[0].name}"`
    );
    Attachment = createModel();
    app.locals.Attachment = Attachment
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const index = require("./routes/index.routes");
app.use("/api", index);
const myDiaryRoute = require("./routes/mydiary.routes");
app.use("/api", myDiaryRoute);
const authRoute = require("./routes/auth.routes");
app.use("/api/auth", authRoute);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
