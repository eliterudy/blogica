var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const authenticate = require("../config/authenticate");
const cors = require("./cors");
const Article = require("../models/articles");
const User = require("../models/users");
const UploadFile = require("../components/UploadFile");

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
    if (req.query.featured) {
      filters = { ...filters, featured: req.query.featured };
    }

    var sortBy = {};
    if (req.query.sort == "new") {
      sortBy["updatedAt"] = -1;
    }

    if (req.query.sort == "top") {
      sortBy["numberOfLikes"] = -1;
    }

    Article.find(
      filters,
      "_id title image_url description author updatedAt createdAt"
    )
      .sort(sortBy)
      .limit(req.query.limit)
      .skip(req.query.offset)
      .then(
        (articles) => {
          Article.count(filters).then(
            (count) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");

              res.json({
                results: articles,
                limit: Number(req.query.limit),
                nextOffset: Number(req.query.offset) + Number(req.query.limit),
                count,
              });
            },
            (err) => next(err)
          );
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
            res.json(article);
            User.findById(req.user._id)
              .then(async (user) => {
                user.published.articles.push(article._id);
                await user.save();
              })
              .catch((err) => next(err));
          },
          (err) => next(err)
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
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
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
        (article) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(article);
          article.numberOfViews += 1;
          article.save();
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
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
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
  )
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
          res.statusCode = 200;
          res.end("Only the author of this article can delete this article");
        }
      })
      .catch((err) => next(err));
  });

module.exports = articleRouter;
