/**
 * Created by matth on 7/1/2017.
 */

const express = require('express');
const router = express.Router();


router.get('/', (request, response) => {
  response.render('index.html');
});

module.exports = router;

