var express = require("express");
var router = express.Router();

require("../models/connection");
const ProposedTag = require("../models/proposedTags");


// Route pour récupérer les modèles de tags proposés à l'utilisateur dans la screen TagCreation

router.get("/getProposedTags", (req, res) => {
  ProposedTag.find({}).then((data) => {
    if (data) {
      res.json({ result: true, proposedTags: data });
    } else {
      res.json({ result: false, error: "Could not get proposed tags from DB" });
    }
  });
});

module.exports = router;
