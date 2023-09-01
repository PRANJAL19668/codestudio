const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    //to check when was the user  createdAt and last updatedAt:
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;