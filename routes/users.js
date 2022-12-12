var express = require('express');
var router = express.Router();

const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then(data => res.json({result : true, data}))
});

//j'enregistre un nouvel utilisateur
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["emailPerso", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ emailPerso: req.body.emailPerso }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        emailPerso: req.body.emailPerso,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});


//route pour ajouter des informations à un utilisateur
//j'enregistre un nouvel utilisateur

  router.put("/profilUpdate", (req, res) => {
    User.findOneAndUpdate(
      { emailPerso: req.body.emailPerso },
      { name: req.body.name, phonePerso: req.body.phonePerso }
    ).then((data) => {
      res.json({ result: true, user: data });
    });
  });

module.exports = router;

