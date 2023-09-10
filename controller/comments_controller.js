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
            post.comment.push(comment); //something given by mongodb
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





//DELETING A COMMENT


module.exports.destroy = async function(req,res){
    try{
        //checking comments if it is actually present or not in db.
        let comment = await Comment.findById(req.params.id); //string params
        //AUTHORIZATION CHECKS IF THE USER IS SAME OR NOT WHO HAS CREATED THE COMMENT i.e,, THE USER WHO IS DELETING A COMMENT.
        if(comment.user == req.user.id){
            //NOW,FIRSTLY GO INSIDE THAT POST WITH POST ID AND DELETE THAT COMMENT.
            // IF I DELETE COMMENT FIRST SO,I WANT TO SAVE POST ID THAT WHICH POST DID THIS COMMENT BELONG TO SO SAVE INTO ANOTHER VARIABLE.
            let postId = comment.post;
            //if comment found,remove that comment.
            comment.remove();
            //i am deleting one of the comments  so update that post and pull out the comment id from the list of comments.
            //$pull is the inbuilt function in mongoose very close to native mongodb syntax CLI.
            Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id }});
            return res.redirect('back');
        } else{
            //if does not matches,return back
            return res.redirect('back');
        }

    } catch (err){
        console.log('Error in fetching/deleting a comment',err);
        return res.redirect('back');
        }
}