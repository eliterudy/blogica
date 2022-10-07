const Article = require("../models/articles");
const { populate } = require("../models/users");
const User = require("../models/users");
var mongoose = require("mongoose");

const UserPropUpdate = {
  getArticlesByProperty: (req, res, next, endpoint) => {
    User.findById(req.user._id)
      .populate({
        path: `${req.query.category}.${req.query.property}`,
      })
      .then(
        (user) => {
          if (user != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user[req.query.category][req.query.property]);
          } else {
            err = new Error(`User not found`);
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  },
  addArticlesToUser: (req, res, next, articles) => {
    User.findById(req.user._id)
      // .populate("favorites.articles")
      .then(
        (user) => {
          console.log(user);
          if (user != null) {
            if (user["published"]["articles"]) {
              var tempArr = user["published"]["articles"];
              tempArr = [...articles, ...tempArr];
              console.log(tempArr);

              user["published"]["articles"] = [...new Set(tempArr)];
              // console.log("user", user);

              user.save().then(
                (user) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(user["published"]["articles"]);
                },
                (err) => next(err)
              );
            }
          } else {
            err = new Error("User favorites not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    return true;
  },
  addArticleToUser: (req, res, next, endpoint) => {
    User.findById(req.user._id)
      // .populate("favorites.articles")
      .then(
        (user) => {
          if (user != null) {
            if (req.body.property === "articles") {
              if (user[req.body.category][req.body.property]) {
                Article.findById(req.body.id, (err, article) => {
                  if (err) {
                    err = new Error(
                      `Article doesn't exist, hence it cannot be added to your ${req.body.category}`
                    );
                    err.status = 404;
                    return next(err);
                  }
                  if (article) {
                    var tempArr = user[req.body.category][
                      req.body.property
                    ].map((e) => e._id.toString());
                    tempArr = [req.body.id, ...tempArr];
                    user[req.body.category][req.body.property] = [
                      ...new Set(tempArr),
                    ];

                    user.save().then(
                      (user) => {
                        if (endpoint === true) {
                          res.statusCode = 200;
                          res.setHeader("Content-Type", "application/json");
                          res.json(user[req.body.category][req.body.property]);
                        }
                      },
                      (err) => next(err)
                    );
                  }
                });
              } else {
                err = new Error(
                  req.body.property + " is not a property in favorites"
                );
                err.status = 404;
                return next(err);
              }
            }
          } else {
            err = new Error("User favorites not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    return true;
  },
  deleteArticlesFromUser: (req, res, next, endpoint) => {
    User.findById(req.user._id)
      .then((user) => {
        if (user != null) {
          if (user[req.body.category][req.body.property]) {
            if (
              user[req.body.category][req.body.property].includes(req.body.id)
            ) {
              user[req.body.category][req.body.property].splice(
                user[req.body.category][req.body.property].indexOf(req.body.id),
                1
              );
            }
            user.save().then(
              (user) => {
                if (endpoint === true) {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(user[req.body.category][req.body.property]);
                }
              },
              (err) => next(err)
            );
          } else {
            err = new Error(
              req.body.property + " is not a property in favorites"
            );
            err.status = 404;
            return next(err);
          }
        } else {
          err = new Error("Favorite not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  },
};

module.exports = UserPropUpdate;
