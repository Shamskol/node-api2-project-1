const express = require("express");
const database = require("../db");
const router = express.Router();



// const blogPosts = [
//     {
//     title: "The post title", // String, required
//     contents: "The post contents", // String, required
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }
// ]

router.get("/", (req, res) => {
    database
      .find()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status().json({ message: "My error" });
      });
  });
  
  router.post("/", (req, res) => {
    const body = req.body;
    if (!body.title || !body.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    } else {
      database
        .insert(req.body)
        .then(result => {
          res.status(201);
          database.findById(result.id).then(post => {
            res.json(post);
          });
        })
        .catch(err => {
          res
            .status(500)
            .json({
              message: "There was an error while saving the post to the database."
            });
        });
    }
  });
  
  router.get("/:id", (req, res) => {
    database
      .findById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  });
  
  router.delete("/:id", (req, res) => {
    database
      .findById(req.params.id)
      .then(post => {
        database
          .remove(post[0].id)
          .then(result => {
            res.status(204).json(result);
          })
          .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
          });
      })
      .catch(err => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      });
  });
  
  router.put("/:id", (req, res) => {
    database.find(req.params.id);
    if (!req.params.id) {
      res.status(400).json({ message: "No post found matching suggested ID" });
    } else if (!req.body.title || !req.body.contents) {
      return res
        .status(400)
        .json({ message: "Post requires a title and contents" });
    } else {
      database
        .update(req.params.id, req.body)
        .then(result => {
          database.findById(req.params.id).then(post => {
            res.status(200).json(post);
          });
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "There was an error updating the post" });
        });
    }
  });
  
  module.exports = router;