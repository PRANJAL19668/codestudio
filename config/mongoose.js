// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/codestudio_developement_db');
// const db=mongoose.connection;
// db.on('error',console.error.bind(console,'Error connecting to the database'));
// db.once('open',function(){
//     console.log(' Successfully! Connected to the database');
// });
// module.exports=db;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codestudio_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to Mongodb"));

db.once('open',function(){
    console.log('Connected to Database:: MongoDB');
});

module.exports = db;
