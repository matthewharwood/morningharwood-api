/**
 * Created by matth on 7/1/2017.
 */
const HttpStatus = require('http-status-codes');
const Models = require('../models');

const express = require('express');
const router = express.Router();
const inflection = require( 'inflection' );

module.exports = (config) => {
  const url = `/${config}`;
  const modelKey = inflection.capitalize(inflection.singularize(config));

  router.route(url)
      .post((req, res) => {
        let item = new Models[modelKey](req.body);
        item.save();
        res.status(HttpStatus.CREATED).send(item)
      })
      .get((req, res) => {
        let query = req.query;
        Models[modelKey].find(query, (err, people) => {

          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

          } else {
            res.json(people);
          }
        });
      });

// Middle ware
  router.use(`${url}/:id`, (req, res, next) => {
    Models[modelKey].findById(req.params.id, (err, item) => {

      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

      } else if (item) {
        req.item = item;
        next();
      } else {
        res.status(HttpStatus.NOT_FOUND).send('Not found');
      }
    });
  });

  router.route(`${url}/:id`)
      .get((req, res) => {
        res.json(req.item)
      })
      .patch((req, res) => {
        if (req.body._id) {
          delete req.body._id;
        }

        for (let k in req.body) {
          if (req.body.hasOwnProperty(k)) {
            req.item[k] = req.body[k];
          }
        }


        req.item.save((err) => {
          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
          } else {
            res.json(req.item)
          }
        });
      })
      .delete((req, res) => {
        req.item.remove((err) => {
          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
          } else {
            res.status(HttpStatus.NO_CONTENT).send(`Removed ${req.body._id}`);
          }

        })
      });

  return router;
};
