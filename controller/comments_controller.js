const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req,res){
    //FINDING COMMENTS OVER THAT POST,SO FIRST  FIND THAT POST WITH A POST_ID FIRST THEN CREATE A COMMENT OVER THAT POST.
    try{
        let post = await Post.findById(req.body.post); // FIND POST WITH POST_ID
        if(post) {
            //if post exists,create a comment over that post.
            let comment = await Comment.create({
                content : req.body.content,
                user: req.user._id,
                post: post._id
            });
            //comment is actually pushed to the post
            post.comments.push(comment); //something given by mongodb
            post.save(); //updated version
            return res .redirect('/');

        } else{
            console.log('Post not found');
            return res.redirect('/');
        }

    } catch(err){
        console.log('Error in fetching/creating comments',err);
        return res.redirect('/');
    }
}