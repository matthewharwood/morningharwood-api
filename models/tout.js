const mongoose = require('mongoose');
const Routes = require('morningharwood-shared');
const routeToEnum = require('./utils/model-names');
const Tooltip = require('./tooltip');

const MODEL_NAME = routeToEnum(Routes.TOUTS);

const Model = new mongoose.Schema({
  eyebrow:  String,
  headline:  String,
  paragraph:  String,
  tooltip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tooltip,
  }
});

module.exports = mongoose.model(MODEL_NAME, Model);