const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('err', console.error.bind(console, 'Eroor in connecting with the monogodb'));
db.once('open', function () {
   console.log('connected to the databse  :: MongoDB');
});

module.exports = db;