const mongooose = require('mongoose');
const postSchema = new mongooose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //This is actually a reference so we need to link  this post to the user so refer to user's  schema.
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;