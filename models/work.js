const mongoose = require('mongoose');
const Routes = require('morningharwood-shared');
const routeToEnum = require('./utils/model-names');
const Tout = require('./tout');

const MODEL_NAME = routeToEnum(Routes.WORKS);

const Model = new mongoose.Schema({
  title: String,
  paragraph: String,
  category: String,
  slug: String,
  who: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tout
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tout
  },
  why: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tout
  },
});

module.exports = mongoose.model(MODEL_NAME, Model);