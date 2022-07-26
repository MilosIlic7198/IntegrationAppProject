// express/app setup
const express = require("express");
const app = express();

// cors, json, urlencoded, cookie-parser setup
const cors = require("cors");
const cookie_Parser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_Parser());

// ejs setup
app.set("view engine", "ejs");

// static files
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

// routes which should handle requests
const user_Routes = require("./api/routes/user.routes");
const home_Routes = require("./api/routes/home.routes");
const integration_List_Routes = require("./api/routes/integration_List.routes");
const inbox_Routes = require("./api/routes/inbox.routes");
const docs_Routes = require("./api/routes/docs.routes");
const about_Routes = require("./api/routes/about.routes");
const manage_Routes = require("./api/routes/manage.routes");

app.use(user_Routes);
app.use(home_Routes);
app.use(integration_List_Routes);
app.use(inbox_Routes);
app.use(docs_Routes);
app.use(about_Routes);
app.use(manage_Routes);

// custom error handler
app.use((req, res, next) => {
  const error = new Error("This page does not exist!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
