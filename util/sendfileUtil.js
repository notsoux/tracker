/**
 * send html static resource
 * @param res
 * @param name file path relative to 'public/html' folder
 */
var sendHTML = function( res, name){
    res.sendFile( `public/html/${name}`, { root: __dirname +'/../' });
};

module.exports = sendHTML;