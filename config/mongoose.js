
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codestudio_development');

const db = mongoose.connection;

db.on('error', console.log.bind(console,"Error connecting to Mongodb"));

db.once('open',function(){
    console.log('Connected to Database:: MongoDB');
});

module.exports = db;
