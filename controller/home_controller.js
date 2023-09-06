const Post = require('../models/post');
//module.exports.actionName=function(req,res){}
module.exports.home= async function(req,res){
    //checking cookies if exist or not.
    //console.log(req.cookies);
    //changing the value of cookies
   // res.cookie('user_id',87);
    //return res.end('<h1>Express  is up for the codestudio!</h1>');
    try{
        let postsdata = await Post.find({});
        return res.render('home',{
            title:'HOME',
            //json object created
            //1st post is the property which we are giving in home.ejs i.e.. (post of posts)
            //2nd postdata  is the value which we are giving in the line no 10 ie..postdata
            posts : postsdata
        });

    } catch (err){
        console.log('Error in finding the post',err);
        return res.redirect('back');
    }
}