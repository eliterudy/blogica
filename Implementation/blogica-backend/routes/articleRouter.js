var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const authenticate = require("../config/authenticate");
const cors = require("../config/cors");
const Article = require("../models/articles");
const User = require("../models/users");
const UploadFile = require("../components/UploadFile");
const Badge = require("../models/badges");
const Config = require("../config/config");
const Users = require("../models/users");
const DataTrimmer = require("../components/DataTrimmer");
const UserPropUpdate = require("../components/UserPropUpdate");

const { VIEW_COUNT_REWARD } = Config;
var articleRouter = express.Router();
articleRouter.use(bodyParser.json());

/* api endpoint for /articles */
articleRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    var filters = {
      title: {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      },
    };

    var sortBy = {};
    if (req.query.sort == "new") {
      sortBy["createdAt"] = -1;
    }

    if (req.query.sort == "top") {
      sortBy["numberOfLikes"] = -1;
    }

    Article.find(filters)
      .sort(sortBy)
      .limit(req.query.limit)
      .skip(req.query.offset)
      .then(
        (articles) => {
          if (articles) {
            Article.count(filters).then(
              (count) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                res.json({
                  results: DataTrimmer.trimArticleList(articles, false),
                  limit: Number(req.query.limit),
                  nextOffset:
                    Number(req.query.offset) + Number(req.query.limit),
                  count,
                });
              },
              (err) => next(err)
            );
          } else {
            err = new Error(`Articles not found`);
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    UploadFile.multerConfig().single("image"),
    async (req, res, next) => {
      if (!req.file) {
        return res.status(401).json({ error: "Please provide an image" });
      }
      var image_url = await UploadFile.uploadPhoto(
        req.file,
        "articles",
        1080,
        1080
      );
      var article = {
        title: req.body.title,
        description: req.body.description,
        image_url: image_url,
        author: req.user._id,
        featured: false,
      };

      Article.create(article)
        .then(
          (article) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(DataTrimmer.trimArticleWithoutAuthorPopulated(article));
            User.findById(req.user._id)
              .then(async (user) => {
                user.published.articles.push(article._id);
                await user.save();
              })
              .catch((err) => next(err));
          },
          (err) => {
            if (err.code == 11000) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.json({ error: "Article duplicate found" });
            }

            next(err);
          }
        )
        .catch((err) => next(err));
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /articles");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Article.remove({})
        .then((resp) => {
          User.updateMany(
            {},
            {
              $set: {
                published: { articles: [] },
                recents: { articles: [] },
                favorites: { articles: [] },
                saved: { articles: [] },
              },
            },
            {
              multi: true,
            },
            function (err, result) {
              if (err) {
                return next(err);
              }
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(resp);
            }
          );
        })
        .catch((err) => next(err));
    }
  );

/* api endpoint for /articles/articleId  */
articleRouter
  .route("/id/:articleId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Article.findById(req.params.articleId)
      .populate(["author"])
      .then(
        async (article) => {
          if (article) {
            article.numberOfViews += 1;
            // article.numberOfViews = 0;
            if (VIEW_COUNT_REWARD.includes(article.numberOfViews)) {
              await Badge.findOne({
                type: "view",
                count: article.numberOfViews,
              })
                .then(async (badge) => {
                  if (badge) {
                    await User.findById(article.author)
                      .then(async (author) => {
                        if (author) {
                          author.points_earned += badge.badge_value;

                          const i = await author.badges.findIndex(
                            (b) => b.badge.toString() == badge._id.toString()
                          );

                          if (i != -1) {
                            author.badges[i].count += 1;
                          } else {
                            author.badges.push({ badge: badge._id, count: 1 });
                          }

                          // article.author = author;
                          await author.save();
                        }
                      })
                      .catch((err) => next(err));
                  }
                })
                .catch((err) => next(err));
            }

            await article.save();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            if (req.query.user_id) {
              User.findById(req.query.user_id).then(
                (user) => {
                  if (user) {
                    var tempArr = (tempArr = [
                      ...new Set([
                        article.id,
                        ...user["recents"]["articles"].map((e) =>
                          e._id.toString()
                        ),
                      ]),
                    ].slice(0, 10));
                    user["recents"]["articles"] = [...tempArr];

                    user.save();
                  }
                },
                (err) => next(err)
              );
            }

            return res.json({
              ...article._doc,
              author: DataTrimmer.trimAuthor(article._doc.author),
            });
          } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error:
                "Article not found. It may have been deleted by the author",
            });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /articles/" + req.params.articleId
    );
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (article.author === req.user._id || req.user.admin) {
          Article.findByIdAndUpdate(
            req.params.articleId,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then(
              (article) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                res.json(article);
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (article.author === req.user._id || req.user.admin) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((resp) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(resp);
            })
            .catch((err) => next(err));
        } else {
          res.statusCode = 403;
          res.end("Only the author of this article can delete this article");
        }
      })
      .catch((err) => next(err));
  });

module.exports = articleRouter;
