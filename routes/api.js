/**
 * Created by matth on 7/1/2017.
 */
const HttpStatus = require('http-status-codes');
const Person = require('../models/person');
const express = require('express');
const router = express.Router();

router.route('/people')
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
router.use('/people/:id', (req, res, next) => {
  Person.findById(req.params.id, (err, people) => {

    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

    } else if (people) {
      req.people = people;
      next();
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Not found');
    }
  });
});

router.route('/people/:id')
    .get((req, res) => {
      res.json(req.people)
    })
    .patch((req, res) => {
      if(req.body._id){
        delete req.body._id;
      }

      for(let k in req.body) {
        if (req.body.hasOwnProperty(k)) {
          req.people[k] = req.body[k];
        }
      }


      req.people.save((err) => {
        if(err) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        } else {
          res.json(req.people)
        }
      });
    })
    .delete((req,res)=> {
      req.people.remove((err)=> {
        if(err) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        } else {
          res.status(HttpStatus.NO_CONTENT).send(`Removed ${req.body._id}`);
        }

      })
    });

module.exports = router;
