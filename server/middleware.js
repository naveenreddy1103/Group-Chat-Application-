const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    let token=req.header('token');
    if(!token){
        console.log('token not found');
        return res.status(400).send('token not found');
    }
    let decode=jwt.verify(token,'login');
    req.user=decode.user
    next();
}