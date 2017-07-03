/**
 * Created by matth on 7/1/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const DB_URL = 'mongodb://localhost:27017/morningharwood';
const PORT = 8000 || process.env.PORT;
const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', mainRouter);
app.use('/api', apiRouter);

app.set('views', path.join(__dirname, '/client/views'));
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/client')));


mongoose.connect(DB_URL, (err)=> {
  if(err) {
    return err
  }
  console.log(`Successfully connected to ${DB_URL}`)
});

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
});