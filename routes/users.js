var express = require("express");
var router = express.Router();

const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/*Modifier un user de la db*/
router.put("/modif/:id", function (req, res) {
  User.findById(req.query("639c866abd38300add50da2c"), function (err, modif) {
    modif.lastName = req.body.contacts;
    modif.firstName = req.body.contacts;
    modif.emailPro = req.body.contacts;
    modif.save(function (err) {
      if (err) {
        console.log("err", err);
      }
      res.status(200).json("ok");
      console.log("bdd upadate");
    });
  });
});

/*route pour créer le doc d'un user en DB*/
router.post("/create", (req, res) => {
  console.log("start");
  User.findOne({ emailMain: req.body.emailMain }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        name: "",
        firstName: "",
        emailMain: req.body.emailMain,
        password: hash,
        token: uid2(32),
        emails: [],
        phones: [],
        birthday: null,
        tagsPerso: [],
        contacts: [],
      });

      newUser.save().then((newDoc) => {
        console.log("data : ", newDoc);
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

module.exports = router;
