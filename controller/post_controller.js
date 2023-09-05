//creating post
//require the models folder
//.. one level up
const Post = require('../models/post');
module.exports.create = async function(req,res){
    try{
        let posts = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    } catch (err){
        console.log('Error in creating a post',err);
        return res.redirect('back');
    }

}
