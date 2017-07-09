/**
 * Created by matth on 7/1/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const Routes = require('morningharwood-shared');

const DB_URL = 'mongodb://localhost:27017/morningharwood';
const PORT = 8000 || process.env.PORT;
const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', mainRouter);

for(let route in Routes){
  app.use('/api', apiRouter(Routes[route]));
}


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