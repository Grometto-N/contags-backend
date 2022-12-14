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

//j'enregistre un nouveau contact
router.post("/addContact", (req, res) => {

  User.findOne({ token: req.body.token }).then((data) => {
    if (data === null) {
     
      let Contacts = []
      const newContact = new Contacts({
        name: req.body.name,
        firstName: req.body.firstName,
        emailPro: req.body.emailPro,
        emailPerso: req.body.emailPerso,
        phonePerso: req.body.phonePerso,
        phonePro: req.body.phonePro,
        birthday: req.body.birthday,
      });

      newContact.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, error: "T'as une erreur mon grand !" });
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

