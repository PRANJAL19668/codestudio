//module.exports.actionName=function(req,res){}
module.exports.home=function(req,res){
    //checking cookies if exist or not.
    console.log(req.cookies);
    //changing the value of cookies
    res.cookie('user_id',25);
    //return res.end('<h1>Express  is up for the codestudio!</h1>');
    return res.render('home',{
        title:'Home'
    });
}