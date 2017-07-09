/**
 * Created by matth on 7/8/2017.
 */


const mongoose = require('mongoose');
const Routes = require('morningharwood-shared');
const routeToEnum = require('./utils/model-names');


const MODEL_NAME = routeToEnum(Routes.TOOLTIPS);

const Model = new mongoose.Schema({
  keyword: {type: String, required: true},
  slug: String,
  headline: String,
  subheading: String,
});

module.exports = mongoose.model(MODEL_NAME, Model);