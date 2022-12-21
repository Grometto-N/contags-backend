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
  
 User.updateOne(
    { token: req.body.token },
    {
      $set: {
        contacts: req.body.contacts
      },
    }
  ).then((contacts) => {
    /* console.log(
      `✅ Modified contact document(s) ...`
    ); */
    User.findOne({ token: req.body.token }).then(
      (contacts) => {
        res.json({ result: true});
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
        lastName: "",
        firstName: "",
        emailMain: req.body.emailMain,
        password: hash,
        token: uid2(32),
        emails: [],
        phones: [],
        dob: "",
        tagsPerso: [],
        contacts: [],
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, error: "T'as une erreur mon grand !" });
    }
  });
});

// Route pour envoyer les inputs utilisateur (prénom, nom, téléphone et ddn) en BDD

router.post("/completeProfile", (req, res) => {
  console.log(req.body)
  const filter = {token: req.body.token};
  const update = {firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob}

  User.findOneAndUpdate( filter, update ).then(data => {
    if (data) {   
      console.log(data)
      res.json({ result: true })
    } else {
      res.json({ result: false, error: "Completion impossible"})
    }
  })
})


// route permettant d'enregistrer les tags perso du user
router.post("/saveTagsPerso", (req, res) => {
 console.log(req.body)

  User.findOneAndUpdate({token: req.body.token} , 
  { 
    "$set": {
        "tagsPerso": req.body.tagsPerso
    }
}
 ).then(data => {
    if (data) {   
      res.json({ result: true, data : data })
    } else {
      res.json({ result: false, error: "Completion impossible"})
    }
  })
})

// route permettant d'enregistrer les tags perso du user
router.post("/updateContact", (req, res) => {
  console.log('req.body',req.body)
  User.findOne({lastName: req.body.lastName}, { contacts: 
    { $elemMatch : 
       { 
         lastName: req.body.test ,
         firstName : req.body.firstName
       } 
    }}  ).then(data => {
    console.log(data)
         if (data) {  
          User.findOne({lastName: req.body.lastName, 'contacts.id': data.contacts.id}
         ).then( 
            dataContact => {res.json({ result: true, data : dataContact}) }
          )
           
         } else {
           res.json({ result: false, error: "Completion impossible"})
         }
       })
 
//    User.findOneAndUpdate({token: req.body.token, contacts.firstName : req.body.contact.firstName} , 
//    { 
//      "$set": {
//          "tagsPerso": req.body.tagsPerso
//      }
//  }
//   ).then(data => {
//      if (data) {   
//        res.json({ result: true, data : data })
//      } else {
//        res.json({ result: false, error: "Completion impossible"})
//      }
//    })
 })

module.exports = router;
