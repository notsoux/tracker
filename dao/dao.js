const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const constant = require ('../constant/Constant');

var url = process.env.MONGODB_CONNECTION_STRING;
let collectionName = process.env.MONGODB_COLLECTION_NAME;
let db;

var dao = {
    connect: function( callback){
        console.log(`mongodb connection url -> ${url}`);
        MongoClient.connect(url, function(err, _db) {
            assert.equal(null, err);
            //db.close();
            db = _db;
            callback( err);
        });
    },
    deleteAll: function( callback){
        db.collection( collectionName).deleteMany( {}, function(err, results) {
            console.log( 'deleteAll');
            callback();
        });
    },
    insertDocument : function( documentToInsert, callback) {
        console.log(`BEFORE insertDocument documentToInsert -> ${ JSON.stringify( documentToInsert)}`);
        db.collection( collectionName).insertOne(
            documentToInsert, function(err, result) {
                if( err){
                    throw Error( constant.DB_CONNECTION_STILL_NOT_AVAILABLE);
                }
                console.log(`AFTER insertDocument documentToInsert -> ${ JSON.stringify( documentToInsert)}`);
                assert.equal(err, null);
                //console.log("Inserted a document into the restaurants collection.");
                callback( result);
            });
    },
    __internalUpdateOrInsertDocument: function (query, update, upsert, callback) {
        db.collection(collectionName).updateOne(query, update, {upsert}).then( function(){
            callback( update);
        })
    },
    updateDocumentById: function( documentToUpdate, callback){
        let filter = this.__internalAddByIdFilter( documentToUpdate._id);
        let upsert = false;
        this.__internalUpdateOrInsertDocument(filter, documentToUpdate, upsert, callback);
    },
    updateOrInsertDocument: function( query, update, callback){
        let upsert = true;
        this.__internalUpdateOrInsertDocument(query, update, upsert, callback);
    },
    findAny: function( filter, callback){
        let data = [];
        db.collection( collectionName).find( filter).toArray()
            .then( function( docs){
                if ( docs != null) {
                    data.push( docs);
                }
                callback( data);
            });
    },
    __internalAddByIdFilter: function( objectId, filter){
        if( filter === undefined){
            filter = {};
        }
        if( !ObjectID.isValid( objectId)){
            let err = new Error();
            err.code = constant.OBJECTID_NOT_VALID_FORMAT;
            throw err;
        }
        filter._id = new ObjectID( objectId);
        return filter
    },
    findById: function( objectId, callback){
        let data = [];
        let filter = this.__internalAddByIdFilter( objectId);

        db.collection( collectionName).find( filter).toArray()
            .then( function( docs){
                if ( docs != null) {
                    callback( docs[0]);
                } else {
                    let err = new Error();
                    err.code = constant.TRACK_NOT_AVAILABLE_MESSAGE;
                    throw err;

                }
            });
    },
    findAll: function( callback){
        this.findAny( null, callback);
    }
}

module.exports = dao;
