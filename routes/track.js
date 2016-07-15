const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const validator = require('validator');

const track_model = require('../model/track_model');
const validation_util = require('../util/validation_util');

/**
get all tracks
 */
router.get('/', function(req, res, next) {
  track_model.all( function( data){
    res.json( data);
  });
  //res.send('respond with a resource');
});

/**
 * get specific track
 */
router.get('/:trackId', function(req, res, next) {
  let trackId = req.params.trackId;
  track_model.byId( trackId, function( data){
    res.json( data);
  });
  //res.send('respond with a resource');
});
/**
 * create new track
 */
router.post('/create', function ( req, res, next) {
  req.checkBody( 'track.name').notEmpty();
  req.sanitizeBody( 'track.name').toString();
  validation_util.checkValidation( req);
  track_model.create( req.body.track.name, function( doc){
    res.send( JSON.stringify( doc));
  });
});

/**
 * add new position to existing track
 */
router.post('/addposition', function ( req, res, next) {
  req.checkBody( 'track.id').notEmpty().isAlphanumeric();
  req.checkBody( 'track.position.latitude').isDecimal();
  req.checkBody( 'track.position.longitude').isDecimal();
  req.checkBody( 'track.position.timestamp').isDate();
  req.sanitizeBody( 'track.id').toString();
  req.sanitizeBody('track.position.latitude').toFloat();
  req.sanitizeBody('track.position.longitude').toFloat();
  validation_util.checkValidation(req);
  let trackId = req.body.track.id;
  let position = req.body.track.position;
  track_model.addPosition( trackId, position, function( doc){
    res.json( doc);
  });
});

module.exports = router;
