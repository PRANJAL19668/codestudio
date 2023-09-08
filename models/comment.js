const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //comment belongs to a user
    //THIS ACTUALLY IS A REFERENCE,SO LINK THIS COMMMENT TO USER WHICH REGER TO THE USER'S SCHEMA ITSELF.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //find out the comment that the comment was made on which post.
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    //TO CHECK WHEN WAS THE USER CREATED AND LAST UPDATED FOR.
    timestamps:{
        createdAt : true,
        updatedAt :true
    }
});
//TELLING MONGOOSE IS A MODEL(COLLECTION).
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;