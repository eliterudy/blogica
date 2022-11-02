const Article = require("../models/articles");
const User = require("../models/users");

const UserPropUpdate = {
  getArticlesByProperty: (req, res, next) => {
    User.findById(req.user._id)

      .then(
        (user) => {
          if (user != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.json(user[req.query.property][req.query.category]);
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            return res.json({ error: "User not found" });
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
              res.statusCode = 404;
              res.setHeader("Content-Type", "application/json");
              return res.json({
                error: `Article doesn't exist, hence it cannot be added to your ${req.body.category}`,
              });
            }
            if (article) {
              var tempArr = user[req.query.property][req.query.category].map(
                (e) => e._id.toString()
              );
              tempArr = [...new Set([req.body.id, ...tempArr])];
              if (req.query.category === "recents") {
                tempArr = tempArr.slice(0, 10);
              }
              user[req.query.property][req.query.category] = [...tempArr];

              user.save().then(
                (user) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(user[req.query.property][req.query.category]);
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
          user[req.query.property][req.query.category].includes(req.body.id)
        ) {
          user[req.query.property][req.query.category].splice(
            user[req.query.property][req.query.category].indexOf(req.body.id),
            1
          );
        }
        user.save().then(
          (user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user[req.query.property][req.query.category]);
          },
          (err) => next(err)
        );
      })
      .catch((err) => next(err));
  },
};

module.exports = UserPropUpdate;
