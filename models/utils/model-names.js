/**
 * Created by matth on 7/8/2017.
 */
const inflection = require( 'inflection' );

// TODO(shared) migrate this to shared this it's own npm package
const routeToEnum = (route) => inflection.capitalize(inflection.singularize(route));


module.exports = routeToEnum;