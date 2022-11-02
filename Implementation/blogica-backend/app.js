var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var schedule = require("node-schedule");

var authenticate = require("./config/authenticate");
var config = require("./config/config");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var articleRouter = require("./routes/articleRouter");
var badgeRouter = require("./routes/badgeRouter");

var mongoUrl = config.DB_CONNECT;
var connect = mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, //make this also true
});

var updateFeatured = (count) => {
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
var rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.tz = "Etc/UTC";

connect.then((db) => {}).catch((err) => {});
var app = express();

// middleware to redirect to secureServer
app.all("*", (req, res, next) => {
  return next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
var urlPathsForImages = [
  { path: "/images/articles", location: "articles" },
  { path: "/images/users", location: "users" },
];

urlPathsForImages.map((urlPath) => {
  app.use(
    urlPath.path,
    express.static(path.join(__dirname, `public/images/${urlPath.location}`))
  );
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articleRouter);
app.use("/badges", badgeRouter);

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
