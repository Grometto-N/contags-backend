var express = require("express");
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
/* router.post("/addContact", (req, res) => {

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
      }); */


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
      res.json({ result: false, error: "T'as une erreur mon grand !" });
    }
  });
}); 

module.exports = router;
