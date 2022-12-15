var express = require("express");
var router = express.Router();

const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");


/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({}).then((data) => res.json({ result: true, data }));
});

//j'enregistre un nouveau contact
router.post("/addAllContact", (req, res) => {
  console.log(req.body.contacts)
 User.updateOne(
    { token: "t320Oc5FBgBjccN3hoqA334j7sT5XO5I" },
    {
      $set: {
        contacts: req.body.contacts
      },
    }
  ).then((contacts) => {
    /* console.log(
      `✅ Modified contact document(s) ...`
    ); */
    User.findOne({ token: "t320Oc5FBgBjccN3hoqA334j7sT5XO5I" }).then(
      (contacts) => {
        console.log(
          "✅ Contact added with sucess"
        );
        //console.log("🔎", contacts.firstName);
      }
      
    );
    
  });
});

/*route pour créer le doc d'un user en DB*/
router.post("/create", (req, res) => {
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
