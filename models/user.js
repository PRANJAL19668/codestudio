const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{
    //to check when was the user  createdAt and last updatedAt:
    timestamps:{
        createdAt: true,
        updatedAt:true
    }
});
const User = mongoose.model('User',userSchema);
module.exports=User;