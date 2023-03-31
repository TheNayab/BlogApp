var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.get("/getall", (req, res, next) => {
  User.find()
    .exec()
    .then((doc) => {
      if (doc < 1) {
        res.status(400).json({
          message: "No User Found",
        });
      } else {
        res.status(200).json(doc);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post(
  "/signup",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user=User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user) {
          res.status(400).json({
            message: "This Email already exist",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                blogs: [],
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(200).json({
                   result:user
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({
                    error: error,
                  });
                });
            }
          });
        }
      });
  }
);

router.post("/login", (req, res, next) => {
  const user=User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(400).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              password: user.password,
            },
            "Thisisallaboutmindgameboy",
          );
          if(result){
            return res.status(200).json({
              message: "Auth successful",
              result:user
            });
          }
         
        }
      });
    });
});

router.delete("/:userid", (req, res, next) => {
  User.findByIdAndRemove({
    _id: req.params.userid,
  })
    .then(() => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
