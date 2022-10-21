var express = require("express");
const bodyParser = require("body-parser");
var passport = require("passport");
var multer = require("multer");
var path = require("path");

const User = require("../models/users");
const authenticate = require("../config/authenticate");
const cors = require("../config/cors");
const UserPropUpdate = require("../components/UserPropUpdate");
const UploadFile = require("../components/UploadFile");
const Badge = require("../models/badges");

var badgeRouter = express.Router();
badgeRouter.use(bodyParser.json());

badgeRouter
  .route("/")
  .options(cors.corsWithOptions, authenticate.verifyAdmin, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Badge.find({}).then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ results: resp });
      },
      (err) => next(err)
    );
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyAdmin,
    UploadFile.multerConfig().single("image"),
    async (req, res, next) => {
      if (!req.file) {
        return res.status(401).json({ error: "Please provide an image" });
      }
      var image_url = await UploadFile.uploadPhoto(
        req.file,
        "badges",
        480,
        480
      );
      console.log("body", req.body, User);
      var badge = {
        ...req.body,
        image_url,
      };
      delete badge[image];
      Badge.create(badge).then(
        (badge) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(badge);
        },
        (err) => next(err)
      );
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /bagde");
  })
  .delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Badge.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch((err) => next(err));
  });

badgeRouter
  .route("/id/:badgeId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Recipe.findById(req.params.badgeId)
      .then(
        (badge) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(badge);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /bagde/${req.params.badgeId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Badge.findByIdAndUpdate(
      req.params.badgeId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (badge) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(badge);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Badge.findByIdAndRemove(req.params.badgeId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch((err) => next(err));
  });

module.exports = badgeRouter;
