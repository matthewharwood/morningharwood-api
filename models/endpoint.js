const mongoose = require('mongoose');
const Routes = require('morningharwood-shared');
const routeToEnum = require( './utils/model-names' );
const Schema = mongoose.Schema;

const MODEL_NAME = routeToEnum(Routes.END_POINTS);

const Model = new Schema({
  slug: String,
});

module.exports = mongoose.model(MODEL_NAME, Model);