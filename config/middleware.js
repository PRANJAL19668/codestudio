//setting up the flash
module.exports.setFlash = function(req, res, next){
    res.locals.flash ={
        'success': req.flash('Success'),
        'error': req.flash('error')
        }
        //next() is passes on the next middleware or response to the browser.
        next();

}