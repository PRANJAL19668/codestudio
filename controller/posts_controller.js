//creating post
//require the models folder
//.. one level up
//using async await with functions 
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            //._id converts it into objectId
            user: req.user._id
        });
        req.flash('Success','Post Published');
        return res.redirect('back');
    } catch (err){
        req.flash('Error','err');
        //console.log('Error in creating a post',err);
        return res.redirect('back');
    }
}





//DELETING A POST
//USING ASYNC AWAIT WITH FUNCTIONS.

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id); //string params
        //AUTHORIZATION,IS I AM ALLOWED TO DELETE A POST THAT HAS BEEN WRIITEN BY MY FRIEND OR VICE VERSA.
        //CHECKING THE USER IF IT IS THE SAME USER WHO HAS CREATED THE POST, IS THE SAME USER WHO IS DELETING THE POST.
        //INITIALLY,ITS IS THE ID OF THE USER( RETURN STRING ID),UNTIL UNLESS I CHOOSE TO POPULATE THE USER(PRELOADED).
        //.id means convert the objectId into string
        if(post.user == req.user.id){
            //if both are same,simply remove the post i.e..current logged user.
            post.remove();
            //using promises
            //commment.deleteMany({}) is the function which  deletes all the comments based on query passed.
            await Comment.deleteMany({post: req.params.id}).then(function(post){
                req.flash('Success','Post and associated Comments destroyed' );
                return res.redirect('back');
            });
        } else{
            //if the user is not same,then simply return back.
            req.flash('error','Yoy cannot deleted this post');
            return res.redirect('back');
        }

    } catch(err){
        //console.log('Error in fetching/deleting a post',err);
        req.flash('Error',err);
        return res.redirect('back');
    }
}
