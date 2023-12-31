//.. means one level up because we are in controllers.
const Post =  require('../models/post');
//importing User
const User = require('../models/user');
//module.exports.actionName=function(req,res){}
//usimg async await only with fuctions.
module.exports.home = async function(req,res){
    //checking cookies if exist or not.
    //console.log(req.cookies);
    //changing the value of cookies
    //user._id value is 87 which is of datatype- objectId
   // res.cookie('user_id',87);
    //return res.end('<h1>Express  is up for the codestudio!</h1>');
    try{
        // finding the post with Post.find({})
        let postsdata = await Post.find({}).
        //populating the user of each post ie.. showing the name of each post.
        //.exec() is the callback function.
        //populate the user of each post.
        populate('user')
        //we need to pre-populate to find the comment and the user of each comment.
        //syntax required
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
       //.exec();
       //if the user is signed-in
       let users  = await User.find({});
        return res.render('home',{
            title:'HOME',
            //json object created
            //1st posts is the property which we are giving in home.ejs i.e.. (post of posts)
            //2nd postsdata  is the value which we are giving in the line no 13 ie..postsdata
            posts : postsdata,
            //json object created for users
            all_users : users
        });

    } catch (err){
        console.log('Error in finding the post',err);
        return res.redirect('back');
    }
}