const Article = require("../models/articles");
const User = require("../models/users");
var mongoose = require("mongoose");

const UserPropUpdate = {
  getArticlesByProperty: (req, res, next) => {
    User.findById(req.user._id)
      // .populate({
      //   path: `${req.query.category}.${req.query.property}`,
      // })
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
  addArticleToUser: (req, res, next) => {
    User.findById(req.user._id)
      .then(
        (user) => {
          Article.findById(req.body.id, (err, article) => {
            if (err) {
              err = new Error(
                `Article doesn't exist, hence it cannot be added to your ${req.body.category}`
              );
              err.status = 404;
              return next(err);
            }
            if (article) {
              var tempArr = user[req.query.category][req.query.property].map(
                (e) => e._id.toString()
              );
              tempArr = [...new Set([req.body.id, ...tempArr])];
              if (req.query.category === "recents") {
                tempArr = tempArr.slice(0, 10);
              }
              user[req.query.category][req.query.property] = [...tempArr];

              user.save().then(
                (user) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(user[req.query.category][req.query.property]);
                },
                (err) => next(err)
              );
            }
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    return true;
  },
  deleteArticlesFromUser: (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (
          user[req.query.category][req.query.property].includes(req.body.id)
        ) {
          user[req.query.category][req.query.property].splice(
            user[req.query.category][req.query.property].indexOf(req.body.id),
            1
          );
        }
        user.save().then(
          (user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user[req.query.category][req.query.property]);
          },
          (err) => next(err)
        );
      })
      .catch((err) => next(err));
  },
};

module.exports = UserPropUpdate;
