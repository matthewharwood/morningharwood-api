/**
 * Created by matth on 7/1/2017.
 */
const HttpStatus = require('http-status-codes');
const Person = require('../models/person');
const Work = require('../models/work');
const express = require('express');
const router = express.Router();


module.exports = (url) => {
  // let Model = url.find()
  router.route(url)
      .post((req, res) => {
        let person = new Person(req.body);
        person.save();
        res.status(HttpStatus.CREATED).send(person)
      })
      .get((req, res) => {
        let query = req.query;
        Person.find(query, (err, people) => {

          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

          } else {
            res.json(people);
          }
        });
      });

// Middle ware
  router.use(`${url}/:id`, (req, res, next) => {
    Person.findById(req.params.id, (err, person) => {

      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

      } else if (person) {
        req.person = person;
        next();
      } else {
        res.status(HttpStatus.NOT_FOUND).send('Not found');
      }
    });
  });

  router.route(`${url}/:id`)
      .get((req, res) => {
        res.json(req.person)
      })
      .patch((req, res) => {
        if (req.body._id) {
          delete req.body._id;
        }

        for (let k in req.body) {
          if (req.body.hasOwnProperty(k)) {
            req.person[k] = req.body[k];
          }
        }


        req.person.save((err) => {
          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
          } else {
            res.json(req.person)
          }
        });
      })
      .delete((req, res) => {
        req.person.remove((err) => {
          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
          } else {
            res.status(HttpStatus.NO_CONTENT).send(`Removed ${req.body._id}`);
          }

        })
      });

  return router;
};
