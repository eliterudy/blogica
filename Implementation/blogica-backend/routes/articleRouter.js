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
      is_published: true,
    };

    var sortBy = {};
    if (req.query.sort == "new") {
      sortBy = {
        createdAt: -1,
        number_of_views: -1,
      };
    }

    if (req.query.sort == "top") {
      sortBy = {
        number_of_views: -1,
        createdAt: 1,
      };
    }

    Article.find(filters)
      .sort(sortBy)
      .limit(req.query.limit)
      .skip(req.query.offset)
      .populate(["author"])
      .then(
        (articles) => {
          if (articles) {
            Article.count(filters).then(
              (count) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                res.json({
                  results: DataTrimmer.trimArticleList(articles, true, false),
                  limit: Number(req.query.limit),
                  nextOffset:
                    Number(req.query.offset) + Number(req.query.limit),
                  count,
                });
              },
              (err) => next(err)
            );
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error:
                "Articles not found. They may have been deleted by the admin",
            });
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
        is_published: req.body.is_published,
      };

      Article.create(article)
        .then(
          (article) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(
              DataTrimmer.trimArticleWithoutAuthorPopulated(article, true)
            );
            User.findById(req.user._id)
              .then(async (user) => {
                if (req.body.is_published === "true") {
                  user.articles.published = [
                    article._id,
                    ...user.articles.published,
                  ];
                } else {
                  user.articles.drafts = [article._id, ...user.articles.drafts];
                }
                await user.save();
              })
              .catch((err) => next(err));
          },
          (err) => {
            // if (err.code == 11000) {
            //   res.statusCode = 400;
            //   res.setHeader("Content-Type", "application/json");
            //   return res.json({
            //     error:
            //       "There is another article with the same title. We cannot have duplicate ",
            //   });
            // }

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
                articles: {
                  published: [],
                  recents: [],
                  favorites: [],
                  saved: [],
                },
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
            article.number_of_views += 1;
            if (VIEW_COUNT_REWARD.includes(article.number_of_views)) {
              await Badge.findOne({
                type: "view",
                count: article.number_of_views,
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
            return res.json(
              DataTrimmer.trimArticleWithAuthorPopulated(article._doc, true)
            );
          } else {
            res.statusCode = 404;
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
      .then((articleOld) => {
        if (
          articleOld &&
          (articleOld.author.toString() === req.user._id.toString() ||
            req.user.admin)
        ) {
          Article.findByIdAndUpdate(
            req.params.articleId,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then(
              (articleNew) => {
                if (!articleNew) {
                  res.statusCode = 404;
                  res.setHeader("Content-Type", "application/json");
                  return res.json({
                    error:
                      "Article not found. It may have been deleted by the author",
                  });
                }

                if (req.body.hasOwnProperty("is_published")) {
                  if (
                    req.body.is_published === true &&
                    articleOld.is_published == false
                  ) {
                    User.findById(articleNew.author._id)
                      .then(
                        (user) => {
                          if (!user) {
                            res.statusCode = 404;
                            res.setHeader("Content-Type", "application/json");
                            return res.json({ error: "User not found" });
                          }

                          var indexInDrafts = user.articles.drafts.indexOf(
                            articleNew._id
                          );
                          if (indexInDrafts != -1) {
                            user.articles.drafts.splice(
                              user.articles.drafts.indexOf(articleNew._id),
                              1
                            );
                          }
                          user.articles.published = [
                            ...new Set([
                              articleNew._id,
                              ...user.articles.published,
                            ]),
                          ];
                          user.save().then((user) => {
                            if (!user) {
                              res.statusCode = 404;
                              res.setHeader("Content-Type", "application/json");
                              return res.json({ error: "User not found" });
                            } else {
                              res.statusCode = 200;
                              res.setHeader("Content-Type", "application/json");
                              return res.json(articleNew);
                            }
                          });
                        },
                        (err) => next(err)
                      )
                      .catch((err) => next(err));
                  } else if (
                    req.body.is_published === false &&
                    articleOld.is_published == true
                  ) {
                    User.findById(articleNew.author._id)
                      .then(
                        (user) => {
                          if (!user) {
                            res.statusCode = 404;
                            res.setHeader("Content-Type", "application/json");
                            return res.json({ error: "User not found" });
                          }
                          var indexInPublished =
                            user.articles.published.indexOf(articleNew._id);
                          if (indexInPublished != -1) {
                            user.articles.published.splice(
                              user.articles.published.indexOf(articleNew._id),
                              1
                            );
                          }
                          user.articles.drafts = [
                            ...new Set([
                              articleNew._id,
                              ...user.articles.drafts,
                            ]),
                          ];
                          user.save().then(
                            (user) => {
                              if (!user) {
                                res.statusCode = 404;
                                res.setHeader(
                                  "Content-Type",
                                  "application/json"
                                );
                                return res.json({ error: "User not found" });
                              } else {
                                res.statusCode = 200;
                                res.setHeader(
                                  "Content-Type",
                                  "application/json"
                                );
                                return res.json(articleNew);
                              }
                            },
                            (err) => next(err)
                          );
                        },
                        (err) => next(err)
                      )
                      .catch((err) => next(err));
                  } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    return res.json(articleNew);
                  }
                } else {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  return res.json(articleNew);
                }
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        } else {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          return res.json({
            error:
              "Only the author of this article or the admin are authorized to update this article",
          });
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (!article) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          return res.json({
            error:
              "Only the author of this article or the admin are authorized to delete this article",
          });
        }
        if (
          article.author.toString() === req.user._id.toString() ||
          req.user.admin
        ) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((resp) => {
              User.findById(req.user._id).then(
                (user) => {
                  if (!user) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    return res.json({ error: "User not found" });
                  }

                  if (user.articles.drafts.includes(req.params.articleId)) {
                    user.articles.drafts.splice(
                      user.articles.drafts.indexOf(req.params.articleId),
                      1
                    );
                  }

                  if (user.articles.published.includes(req.params.articleId)) {
                    user.articles.published.splice(
                      user.articles.published.indexOf(req.params.articleId),
                      1
                    );
                  }

                  user.save().then(
                    (user) => {
                      if (!user) {
                        res.statusCode = 404;
                        res.setHeader("Content-Type", "application/json");
                        return res.json({ error: "User not found" });
                      }

                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      return res.json(resp);
                    },
                    (err) => next(err)
                  );

                  User.find({ admin: false }).then(
                    (users) => {
                      if (users) {
                        users.map((user) => {
                          if (
                            user.articles.recents.includes(req.params.articleId)
                          ) {
                            user.articles.recents.splice(
                              user.articles.recents.indexOf(
                                req.params.articleId
                              ),
                              1
                            );
                          }
                          if (
                            user.articles.saved.includes(req.params.articleId)
                          ) {
                            user.articles.saved.splice(
                              user.articles.saved.indexOf(req.params.articleId),
                              1
                            );
                          }

                          if (
                            user.articles.favorites.includes(
                              req.params.articleId
                            )
                          ) {
                            user.articles.favorites.splice(
                              user.articles.favorites.indexOf(
                                req.params.articleId
                              ),
                              1
                            );
                          }

                          User.findByIdAndUpdate(
                            user._id,
                            {
                              $set: { articles: user.articles },
                            },
                            { new: true }
                          );
                        });
                      }
                    },
                    (err) => {}
                  );
                },
                (err) => next(err)
              );
            })
            .catch((err) => next(err));
        } else {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          return res.json({
            error:
              "Only the author of this article or the admin are authorized to delete this article",
          });
        }
      })
      .catch((err) => next(err));
  });

module.exports = articleRouter;
