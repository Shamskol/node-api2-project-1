const express = require("express");
const database = require("../data/db");
const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  database
    .findById(req.params.id)
    .then(result => {
      database
        .findPostComments(req.params.id)
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              message: "The comments information could not be retrieved."
            });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

router.post("/", (req, res) => {
    console.log(req.params.id)
  database
    .findById(req.params.id)
    .then(result => {
      if (!req.body.text) {
        res
          .status(400)
          .json({ message: "Please provide text for the comment." });
      } else {
        database
          .insertComment({ text: req.body.text, post_id: parseInt(req.params.id)})
          .then(result => {
            res.status(201).json(result);
          })
          .catch(err => {
            res.status(500).json({
              message:
                "There was an error while saving the comment to the database."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

module.exports = router;