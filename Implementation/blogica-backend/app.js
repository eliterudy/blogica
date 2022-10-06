const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const authenticate = require("./config/authenticate");
const config = require("./config/config");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const schedule = require("node-schedule");

const mongoUrl = config.mongoUrl;
const connect = mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, //make this also true
});

const updateFeatured = (count) => {
  console.log("updateFeatured");
  if (count < 5) {
    count = count + 1;
    Article.updateMany({ featured: true }, { $set: { featured: false } })
      .then((docs) => {
        Article.find({}).then((articles) => {
          var numberOfArticles = articles.length;
          if (numberOfArticles < 9) {
          } else {
            for (var i = 0; i < 9; i++) {
              var index = Math.floor(Math.random() * numberOfArticles);

              Article.findByIdAndUpdate(
                articles[index]._id,
                {
                  $set: { featured: true },
                },
                { new: true }
              )
                .then((article) => {})
                .catch((err) => updateFeatured(count));
            }
          }
        });
      })
      .catch((err) => updateFeatured(count));
  }
};
const rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.tz = "Etc/UTC";

connect
  .then((db) => {
    schedule.scheduleJob(rule, () => {
      var count = 0;
      updateFeatured(count);
    });
  })
  .catch((err) => {});
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

module.exports = app;
