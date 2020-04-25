var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var loginRouter = require("./routes/login");
var mapRouter = require("./routes/map");
var symptomRouter = require("./routes/symptoms");
var signupRouter = require("./routes/signup");
var savegameRouter = require("./routes/savegame");
var updategameRouter = require("./routes/updategame");
var locationRouter = require("./routes/location");
var getgameRouter = require("./routes/getgame");
var deleteRouter = require("./routes/deleteuser");
var infoRouter = require("./routes/info");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "seng3011website/build")));

app.use("/login", loginRouter);
app.use("/map", mapRouter);
app.use("/symptoms", symptomRouter);
app.use("/signup", signupRouter);
app.use("/savegame", savegameRouter);
app.use("/location", locationRouter);
app.use("/getgame", getgameRouter);
app.use("/delete", deleteRouter);
app.use("/info", infoRouter);
app.use("/updategame", updategameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/seng3011website/build/index.html"));
});

module.exports = app;
