//creating post
//require the models folder
//.. one level up
//using async await with functions 
const Post = require('../models/post');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err){
        console.log('Error in creating a post',err);
        return res.redirect('back');
    }

}