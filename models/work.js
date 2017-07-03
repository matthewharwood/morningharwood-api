const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MODEL_NAME = 'Work';

const Model = new Schema({
  title: String,
});

module.exports = mongoose.model(MODEL_NAME, Model);