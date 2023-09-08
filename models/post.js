const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        //This is actually a reference so we need to link this post to the user so refer to user's  schema.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //WHENEVER I AM LOADING POST,I NEED TO FIND OUT ALL THE COMMENTS INSIDE THAT POST, 1ST WAY IS TO GO TO COMMMENT SCHEMA FIND ALL THE COMMMENTS INSIDE THAT SCHEMA WHICH IS TRUE BUT ITS A LONG PROCESS.
    // 2ND WAY : INCLUDING ALL THE ARRAYS OF IDS OF ALL THE COMMENTS INSIDE POST SCHEMA ITSELF WHICH IS QUICK AND FAST PROCESS.
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},{
    //TO CHECK WHEN WAS THE USER CREATED AND LAST UPDATED AT:
    timestamps:{
        createdAt: true,
        updatedAt: true
    }
});
//TELLING MONGOOSE IS A MODEL (COLLECTION).
const Post = mongoose.model('Post',postSchema);
module.exports = Post;