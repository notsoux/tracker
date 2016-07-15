const dao = require('../dao/dao');

let track_model = {
    all: function( callback){
        dao.findAll( callback);
    },
    create: function( trackName, callback){
        let track = {
            name: trackName,
            location: []
        };
        dao.insertDocument( track, function( doc){
            callback( track);
        });
    },
    addPosition: function( trackId, positionToAdd, callback){
        dao.findById( trackId, function( track){
            if( track.locations === undefined){
                track.locations = [];
            }
            track.locations.push( positionToAdd);
            dao.updateDocumentById( track, function( track){
                callback( track);
            });
        });
    },
    byId: function( trackId, callback){
        dao.findById( trackId, function( track){
            callback( track);
        });
    }
}

module.exports = track_model;
