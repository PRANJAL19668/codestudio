//.. means one level up because we are in controllers.
const Post =  require('../models/post');
//module.exports.actionName=function(req,res){}
module.exports.home = async function(req,res){
    //checking cookies if exist or not.
    //console.log(req.cookies);
    //changing the value of cookies
    //user._id value is 87
   // res.cookie('user_id',87);
    //return res.end('<h1>Express  is up for the codestudio!</h1>');
    try{
        // finding the post with Post.find({})
        let postsdata = await Post.find({}).
        //populating the user of each post ie.. showing the name of each post.
        //.exec() is the callback function.
        populate('user').exec();
        return res.render('home',{
            title:'HOME',
            //json object created
            //1st posts is the property which we are giving in home.ejs i.e.. (post of posts)
            //2nd postsdata  is the value which we are giving in the line no 13 ie..postsdata
            posts : postsdata
        });

    } catch (err){
        console.log('Error in finding the post',err);
        return res.redirect('back');
    }
}