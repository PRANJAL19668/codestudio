const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codestudio_developement_db');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to the database'));
db.once('open',function(){
    console.log(' Successfully! Connected to the database');
});
module.exports=db;