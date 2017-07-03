const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true);
const MODEL_NAME = 'Person';

const Model = new Schema({
  address: {type: String},
  birthDate: {type: String},
  email: {type: String},
  jobTitle: {type: String},
  telephone: {type: Number},
  worksFor: {type: String},
  description: {type: String},
  name: String,
  social: {
    facebook: {type: String},
    twitter: {type: String},
    portfolio: {type: String},
    github: {type: String},
  }
});

module.exports = mongoose.model(MODEL_NAME, Model);